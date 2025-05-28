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

const createContractorSchema = z.object({
  name: z.string().min(3, { message: "Bedrijfsnaam moet minstens 3 tekens bevatten" }),
  email: z.string().email({ message: "Ongeldig e-mailadres" }),
  telephone: z.string().regex(/^\+?[0-9\s\-]{7,15}$/, {
    message: 'Ongeldig telefoonnummer',
  }),
  status: z.boolean().default(true),
});
type CreateContractorSchema = z.infer<typeof createContractorSchema>;
export { createContractorSchema };
export type { CreateContractorSchema };
export type CreateContractorResponse = { error: any, data: { user_role: string | undefined } }

export async function getContractorCountByStatus(status: boolean): Promise<number | null> {
    const supabase = await createClient();

    return ((await supabase.from('contractors').select('id').eq('status', status)).data?.length) || 0
}

export async function getColdQuoteCount(): Promise<number | null> {
    const supabase = await createClient();

    return (await supabase.from('cold_quotes').select('id')).data?.length || 0
}

export async function getCustomerCount(): Promise<number | null> {
    const supabase = await createClient();

    return (await supabase.from('customers').select('id')).data?.length || 0
}

export async function getRecentColdQuotes(): Promise<any> {
    const supabase = await createClient();

    return (await supabase.from('all_quotes').select('id, quote_number, total_price, created_at').limit(5)).data
}