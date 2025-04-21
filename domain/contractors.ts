import { Tables } from "@/lib/supabase.types";
import { createClient } from "@/util/supabase/server";

export type Contractor = Tables<'contractors'>;
export type Image = Tables<'contractor_project_images'>;

export type ExtendedContractor = Contractor & {
  contractor_project_images: string[];
  rating: number;
  label: string;
  availability: string;
  reviews: any[]; // TODO: type this properly later
};

export async function getContractors(): Promise<{
    data: ExtendedContractor[] | undefined;
    error: any; // or SupabaseError if typed
  }>{

    const supabase = await createClient();

    return supabase
    .from('contractors')
    .select(`
      *,
      contractor_project_images (
        image_path
      )
    `).then((res) => {
      let { data: contractors, error } = res;

      contractors?.map((contractor: any) => {
        // for some reason map doesn't work
        contractor.contractor_project_images = contractor.contractor_project_images.map((img: Image) =>
          supabase.storage.from('contractor-images').getPublicUrl(img.image_path).data.publicUrl
        );

        contractor.profile_image = supabase.storage.from('contractor-images').getPublicUrl(contractor.profile_image).data.publicUrl;
        contractor.rating = "4.0";
        contractor.label = "Door ons geselecteerd";
        contractor.availability = "Binnen 3 weken";
        contractor.reviews = [];
        return contractor;
      });
      return { data: contractors, error: error };
    });
}

// Function to calculate quote for a specific contractor
export const calculateQuoteForContractor = (contractor: ExtendedContractor, roofType: 'dakpannen' | 'leien', hasInsulation: boolean, hasGutters: boolean, hasSolarPanels: boolean, hasSkylights: boolean, hasFacadeCladding: boolean) => {
  const basePrice = 5000 + Math.floor(Math.random() * 2000)
  let materialCost = 0

  const materialModifier = contractor.dakbedekking_per_sq_meter //contractor.priceModifiers[formData.roofType]
  const laborModifier = contractor.afbraakwerken_per_sq_meter + contractor.timmerwerken_per_sq_meter //contractor.laborRate

  switch (roofType) {
      case "dakpannen":
      materialCost = (2000 + Math.floor(Math.random() * 1000)) * materialModifier
      break
      case "leien":
      materialCost = (8000 + Math.floor(Math.random() * 2000)) * materialModifier
      break
      default:
      materialCost = 2000 * materialModifier
  }

  const laborCost = (3000 + Math.floor(Math.random() * 1500)) * laborModifier
  const additionalCosts = 500 + Math.floor(Math.random() * 500)
  const extrasCost = calculateExtrasCost(hasInsulation, hasGutters, hasSolarPanels, hasSkylights, hasFacadeCladding)
  const totalPrice = basePrice + materialCost + laborCost + additionalCosts + extrasCost

  let estimatedDuration = ""
  if (totalPrice < 10000) {
      estimatedDuration = "2-3 dagen"
  } else if (totalPrice < 20000) {
      estimatedDuration = "4-5 dagen"
  } else {
      estimatedDuration = "7-10 dagen"
  }

  return {
      basePrice,
      materialCost,
      laborCost,
      additionalCosts,
      extrasCost,
      totalPrice,
      estimatedDuration,
  }
}

// Function to calculate extras cost
export const calculateExtrasCost = (hasInsulation: boolean, hasGutters: boolean, hasSolarPanels: boolean, hasSkylights: boolean, hasFacadeCladding: boolean) => {
  let cost = 0
  if (hasInsulation) cost += 2500
  if (hasGutters) cost += 1200
  if (hasSolarPanels) cost += 5000
  if (hasSkylights) cost += 1800
  if (hasFacadeCladding) cost += 3200
  return cost
}