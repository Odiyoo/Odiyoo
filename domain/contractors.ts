import { z } from "zod";
import { Tables } from "@/lib/supabase.types";
import { createClient } from "@/util/supabase/server";
import moment from 'moment';

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

export type ContractorQuote = {
  materialCost: number,
  afbraakCost: number,
  timmerCost: number,
  extrasCost: number,
  laborCost: number,
  totalPrice: number,
  estimatedDuration: string,
}

// Function to calculate quote for a specific contractor
export const calculateQuoteForContractor = (roofSize: number, contractor: ExtendedContractor, roofType: 'dakpannen' | 'leien', hasInsulation: boolean, hasGutters: boolean, hasSolarPanels: boolean, hasSkylights: boolean, hasFacadeCladding: boolean): ContractorQuote => {
  //const basePrice = 5000
  
  //const materialModifier = contractor.dakbedekking_per_sq_meter //contractor.priceModifiers[formData.roofType]
  let materialCost = 0
  
  switch (roofType) {
      case "dakpannen":
        materialCost = roofSize * contractor.dakbedekking_per_sq_meter
      break
      case "leien":
        materialCost = roofSize * contractor.dakbedekking_per_sq_meter
      break
      default:
        materialCost = roofSize * contractor.dakbedekking_per_sq_meter
  }

  const laborCost = roofSize * (contractor.afbraakwerken_per_sq_meter + contractor.timmerwerken_per_sq_meter);
  const afbraakCost = roofSize * contractor.afbraakwerken_per_sq_meter;
  const timmerCost = roofSize * contractor.timmerwerken_per_sq_meter;
  const extrasCost = calculateExtrasCost(roofSize, contractor, hasInsulation, hasGutters, hasSolarPanels, hasSkylights, hasFacadeCladding)
  const totalPrice = materialCost + afbraakCost + timmerCost + extrasCost


  // Determine duration
  let estimatedDuration = ""
  if (totalPrice < 10000) {
      estimatedDuration = "2-3 dagen"
  } else if (totalPrice < 20000) {
      estimatedDuration = "4-5 dagen"
  } else {
      estimatedDuration = "7-10 dagen"
  }

  return {
      materialCost,
      afbraakCost,
      timmerCost,
      extrasCost,
      laborCost,
      totalPrice,
      estimatedDuration,
  }
}

// Function to calculate extras cost
export const calculateExtrasCost = (roofSize: number, hasInsulation: boolean, hasGutters: boolean, hasSolarPanels: boolean, hasSkylights: boolean, hasFacadeCladding: boolean, contractor?: ExtendedContractor) => {
  let cost = 0
  if (contractor && hasInsulation) cost += (calculateInsulationCost(roofSize, contractor))
  if (!contractor && hasInsulation) cost += 4500
  if (hasGutters) cost += 1200
  if (hasSolarPanels) cost += 5000
  if (hasSkylights) cost += 1800
  if (hasFacadeCladding) cost += 3200
  return cost
}

export const calculateInsulationCost = (roofSize: number, contractor: ExtendedContractor) => {
  return roofSize * contractor.isolatie_per_sq_meter;
}


const contractorAddSchema = z.object({
  name: z.string().min(3, { message: "Bedrijfsnaam moet minstens 3 tekens bevatten" }),
  //email: z.string().email({ message: "Ongeldig e-mailadres" }),
  telephone: z.string().regex(/^\+?[0-9\s\-]{7,15}$/, {
    message: 'Ongeldig telefoonnummer',
  }),
  company_start_year: z.date()
    .max(new Date(), { message: "Datum kan niet in de toekomst liggen." })
    .min(moment().subtract(300, 'years').toDate(), { message: "Startdatum kan niet verder dan 300 jaar in het verleden liggen." }),
  btw_nr: z.string().min(8, { message: "Wachtwoord moet minstens 8 tekens bevatten" }),
  bankacccount_nr: z.string().min(8, { message: "Wachtwoord moet minstens 8 tekens bevatten" }),
  city: z.string().min(3, { message: "Stad moet minstens 3 tekens bevatten" }),
  has_bankruptcy_protection: z.boolean().default(false),
  has_showroom: z.boolean().default(false),
  afbraakwerken_per_sq_meter: z.number().min(0),
  timmerwerken_per_sq_meter: z.number().min(0),
  isolatie_per_sq_meter: z.number().min(0),
  dakbedekking_per_sq_meter: z.number().min(0),
  warranty_labor_in_years: z.number().min(0), // TODO: what is the legal requirement?
  warranty_material_in_years: z.number().min(0), // TODO: what is the legal requirement?
  profile_image: z.string().optional(),
  status: z.boolean().default(true),
});
type ContractorAddSchema = z.infer<typeof contractorAddSchema>;
export { contractorAddSchema };
export type { ContractorAddSchema };
export type ContractorAddResponse = { error: any, data: { user_role: string | undefined } };

export async function createContractor(contractor: ContractorAddSchema): Promise<ContractorAddResponse> {
  const supabase = await createClient();

  // insert contractor
  const { error, data } = await supabase.from('contractors').insert(
      contractor
  );
  const contractor_id = data.contractor_id

  // upload profile image to storage
  const filePath = uploadProfileImage(contractor_id);

  // update contractor record
  await supabase.from('contractors').update({
    profile_image: filePath
  }).eq('id', contractor_id)

  return { error, data: {} };
}

// TODO: what file types are allowed? and how to store?
export async function uploadProjectImages(file: File, contractor_id: string) {
  const supabase = await createClient();
  
  const filePath = `contractors/${contractor_id}/projects/${moment().unix}`
  const { error , data } = await supabase.storage
    .from('contractor-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })
  
  if (error) throw error;

  return filePath;
}


// TODO: what file types are allowed? and how to store?
export async function uploadProfileImage(file: File, contractor_id: string) {
  const supabase = await createClient();
  
  const filePath = `contractors/${contractor_id}/${moment().unix}`
  const { error , data } = await supabase.storage
    .from('contractor-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })
  
  if (error) throw error;

  return filePath;
}