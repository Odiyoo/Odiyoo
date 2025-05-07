import { z } from "zod";
import { Tables } from "@/lib/supabase.types";
import { createClient } from "@/util/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

export type Customer = Tables<'customers'>;

export type ExtendedCustomer = Customer & {
  user: {
    email: string,
    phone: string,
  }
};

export async function getCustomers(): Promise<any>{

    const supabase = await createClient();

    /*return supabase
    .from('customers')
    .select(`
      *,
    `).then((res) => {
      let { data: customers, error } = res;

      const extended_customers = customers?.map((customer: any) => {
        customer.user = supabase.schema('auth').from('users').select('email, phone')
        return customer;
      });
      
      return { data: extended_customers, error: error };
    });*/

    return supabase.from('customer_view').select('*').then((res) => {

        let { data: customers, error, count } = res;

        return { data: customers, count, error: error}
    })
}