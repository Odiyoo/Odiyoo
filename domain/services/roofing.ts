import { createClient } from "@/util/supabase/server";
import { z } from "zod";

/* Roof inspection request */
const freeRoofInspectionSchema = z.object({
    fullname: z.string().min(2, { message: "Ongeldige naam" }),
    address: z.string().min(4, { message: "Ongeldig adres" }),
    email: z.string().email({ message: "Ongeldig e-mailadres" }),
    telephone: z.string().regex(/^\+?[0-9\s\-]{7,15}$/, {
        message: 'Ongeldig telefoonnummer',
    }),
});
type FreeRoofInspectionSchema = z.infer<typeof freeRoofInspectionSchema>;

export { freeRoofInspectionSchema };
export type { FreeRoofInspectionSchema };

/* Create quote */
const quoteAddSchema = z.object({
    address: z.string().min(4, { message: "Ongeldig adres" }),
    email: z.string().email({ message: "Ongeldig e-mailadres" }),
    surface_in_sq_meter: z.number().min(1, { message: "Ongeldige waarde" }),
    contractor_id: z.string().min(0, { message: "Ongeldige waarde" }),
    extras_id: z.string().min(0, { message: "Ongeldige waarde" }),
    roofing_type_id: z.string().min(0, { message: "Ongeldige waarde" }),
    total_price: z.number().min(0, { message: "Ongeldige waarde" }),
    has_dakraam: z.boolean().default(false),
    insulation: z.string().default('geen'),
    dakgoten: z.string().default('niet vervangen'),
});
type QuoteAddSchema = z.infer<typeof quoteAddSchema>;

export { quoteAddSchema };
export type { QuoteAddSchema };
export type QuoteAddResponse = { error: any, data: any };

export async function createQuote(cold_quote: QuoteAddSchema): Promise<QuoteAddResponse> {
  const supabase = await createClient();

  // insert contractor
  const { error, data } = await supabase.from('dakbedekking_quotes').insert(
      cold_quote
  );

  return { error, data };
}

/* Create Dakreiniging quote */
const quoteDakreinigingAddSchema = z.object({
    address: z.string().min(4, { message: "Ongeldig adres" }),
    email: z.string().email({ message: "Ongeldig e-mailadres" }),
    surface_in_sq_meter: z.number().min(1, { message: "Ongeldige waarde" }),
    contractor_id: z.string().min(0, { message: "Ongeldige waarde" }),
    extras_id: z.string().min(0, { message: "Ongeldige waarde" }),
    roofing_type_id: z.string().min(0, { message: "Ongeldige waarde" }),
    total_price: z.number().min(0, { message: "Ongeldige waarde" }),
    has_dakraam: z.boolean().default(false),
    insulation: z.string().default('geen'),
    dakgoten: z.string().default('niet vervangen'),
});
type QuoteDakReinigingAddSchema = z.infer<typeof quoteAddSchema>;

export { quoteDakreinigingAddSchema };
export type { QuoteDakReinigingAddSchema };

export async function createDakreinigingQuote(cold_quote: QuoteDakReinigingAddSchema): Promise<QuoteAddResponse> {
  const supabase = await createClient();

  // insert contractor
  const { error, data } = await supabase.from('cold_quotes').insert(
      cold_quote
  );

  return { error, data };
}

/* Appointment request */
const appointmentRequestSchema = z.object({
    fullname: z.string().min(2, { message: "Ongeldige naam" }),
    address: z.string().min(4, { message: "Ongeldig adres" }),
    email: z.string().email({ message: "Ongeldig e-mailadres" }),
    telephone: z.string().regex(/^\+?[0-9\s\-]{7,15}$/, {
        message: 'Ongeldig telefoonnummer',
    }),
});
type AppointmentRequestSchema = z.infer<typeof appointmentRequestSchema>;

export { appointmentRequestSchema };
export type { AppointmentRequestSchema };
export type AppointmentRequestResponse = { error: any, data: any };

export async function createAppointmentRequest(cold_quote: AppointmentRequestSchema, quote_id: number): Promise<AppointmentRequestResponse> {
  const supabase = await createClient();

  const { error, data } = await supabase.from('appointment_requests').insert(
      {...cold_quote, id: quote_id}
  );

  return { error, data };
}