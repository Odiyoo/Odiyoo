import { z } from "zod";
import { Tables } from "@/lib/supabase.types";
import { createClient } from "@/util/supabase/server";
import type { PostgrestError } from '@supabase/supabase-js';


export type DakrenovatieQuote = Tables<'dakbedekking_quotes'>;
export type DakreinigingQuote = Tables<'dakreiniging_quotes'>;
export type Image = Tables<'contractor_project_images'>;

export type DakQuote = DakrenovatieQuote & DakreinigingQuote & { quote_type: string } 

export async function getQuotes(): Promise<{
    data: DakQuote[] | null;
    error: PostgrestError | null;
}> {

    const supabase = await createClient();

    const res = await supabase
        .from('all_quotes')
        .select();

    /*
        TODO:
        - Join with appointment_requests & appointment_quotes for status?
        - What about appointments without quotes? Seperate query? Seperate page?
    */

    return { data: res.data, error: res.error }
}