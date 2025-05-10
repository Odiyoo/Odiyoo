import { z } from "zod";
import { Tables } from "@/lib/supabase.types";
import { createClient } from "@/util/supabase/server";
import moment from 'moment';

export const DAKREINIGINGS_START_METERS = 220;
export type InsulationChoice = 'geen' | '10cm' | '12cm' | '14cm';
export type DakgotenChoice = 'niet vervangen' | 'zinken goot' | 'bekleden' | 'hanggoot';
export type DakraamChoice = 'geen' | 'tuimelvenster' | 'uitzettuimelvenster';

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
}> {

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
      const mock_availabilities = ["Binnen 2 weken", "Binnen 3 weken", "Binnen 4 weken", "Binnen 1.5 weken", "Binnen 1 week"]
      const mock_rating = ["4.0", "4.9", "4.3", "3.9", "4.5"]

      contractors?.map((contractor: any, key: number) => {
        // for some reason map doesn't work
        contractor.contractor_project_images = contractor.contractor_project_images.map((img: Image) =>
          supabase.storage.from('contractor-images').getPublicUrl(img.image_path).data.publicUrl
        );

        contractor.profile_image = supabase.storage.from('contractor-images').getPublicUrl(contractor.profile_image).data.publicUrl;
        contractor.rating = mock_rating[key];
        contractor.label = "Door ons geselecteerd";
        contractor.availability = mock_availabilities[key];
        contractor.reviews = [];
        return contractor;
      });
      return { data: contractors, error: error };
    });
}

export type ContractorDakrenovatieQuote = {
  materialCost: number,
  afbraakCost: number,
  timmerCost: number,
  extrasCost: number,
  insulationCost: number,
  dakRaamCost: number,
  dakGotenCost: number,
  laborCost: number,
  totalPrice: number,
  estimatedDuration: string,
}

export type ContractorDakreinigingQuote = {
  startPrice: number,
  costBasedOnSurface: number,
  totalPrice: number,
  estimatedDuration: string,
}

// Function to calculate quote for a specific contractor
export const calculateDakrenovatieQuoteForContractor = (roofSize: number, contractor: ExtendedContractor, choiceInsulation: InsulationChoice, choiceDakRaam: DakraamChoice, choiceDakgoten: DakgotenChoice, roofType: 'dakpannen' | 'leien', hasInsulation: boolean, hasGutters: boolean, hasSolarPanels: boolean, hasSkylights: boolean, hasFacadeCladding: boolean): ContractorDakrenovatieQuote => {
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
  const extrasCost = calculateExtrasCost(roofSize, contractor, hasInsulation, hasGutters, hasSolarPanels, hasSkylights, hasFacadeCladding);
  
  let insulationCost = 0;
  if (choiceInsulation === '10cm') insulationCost = roofSize * 51;
  if (choiceInsulation === '12cm') insulationCost = roofSize * 55;
  if (choiceInsulation === '14cm') insulationCost = roofSize * 59;
  let dakGotenCost = 0;
  if (choiceDakgoten === 'zinken goot') dakGotenCost = 270;
  if (choiceDakgoten === 'bekleden') dakGotenCost = 225;
  if (choiceDakgoten === 'hanggoot') dakGotenCost = 70;
  let dakRaamCost = 400;
  
  const totalPrice = materialCost + afbraakCost + timmerCost + insulationCost + dakGotenCost + dakRaamCost; // TODO: add extrasCost

  // Determine duration
  let estimatedDuration = ""
  if (totalPrice < 10000) {
    estimatedDuration = "2-3 dagen"
  } else if (totalPrice < 20000) {
    estimatedDuration = "4-5 dagen"
  } else {
    estimatedDuration = "7-10 dagen"
  }


  console.log({
    materialCost,
    afbraakCost,
    timmerCost,
    extrasCost,
    insulationCost,
    dakRaamCost,
    dakGotenCost,
    laborCost,
    totalPrice,
    estimatedDuration,
  })
  return {
    materialCost,
    afbraakCost,
    timmerCost,
    extrasCost,
    insulationCost,
    dakRaamCost,
    dakGotenCost,
    laborCost,
    totalPrice,
    estimatedDuration,
  }
}

// Function to calculate quote for a specific contractor
export const calculateDakreinigingQuoteForContractor = (roofSize: number, contractor: ExtendedContractor, hasDakbedekking: boolean, hasGootsystemen: boolean, hasZonnepanelen: boolean, hasVeluxramen: boolean, hasSchoorsteen: boolean, hasAquaplan: boolean): ContractorDakreinigingQuote => {
  let costBasedOnSurface = 0

  if (roofSize > DAKREINIGINGS_START_METERS) {
    costBasedOnSurface = roofSize * contractor.dakreiniging_prijs_per_sq_meter;
  }

  const totalPrice = contractor.dakreiniging_start_price + costBasedOnSurface


  // Determine duration
  let estimatedDuration = ""
  if (roofSize < 200) {
    estimatedDuration = "2 dagen"
  } else {
    estimatedDuration = "1 dag"
  }

  return {
    startPrice: contractor.dakreiniging_start_price,
    costBasedOnSurface,
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
  const { error, data } = await supabase.storage
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
  const { error, data } = await supabase.storage
    .from('contractor-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) throw error;

  return filePath;
}