import { createClient } from "@/util/supabase/server";
import { z } from "zod";
import { ContractorDakreinigingQuote, ContractorDakrenovatieQuote } from "../contractors";
import { FormData } from '../../app/quote/dakrenovatie/Form'
import { FormData as DakReinigingFormData } from '../../app/quote/dakreiniging/Form'
import { Tables } from "@/lib/supabase.types";

export type AppointmentRequest = Tables<'appointment_requests'>;
export type ExtendedAppointmentRequest = AppointmentRequest & {
    appointment_quotes: {
        appointment_id: string,
        quote_type: string,
        quote_id: string,
    }[]
}

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
    surface_in_sq_meter: z.coerce.number().min(1, { message: "Ongeldige waarde" }),
    contractor_id: z.string().min(0, { message: "Ongeldige waarde" }),
    total_price: z.number().min(0, { message: "Ongeldige waarde" }),
    has_gootsystemen: z.boolean().default(false),
    has_dakramen: z.boolean().default(false),
    has_zonnepanelen: z.boolean().default(false),
    has_dakbedekking: z.boolean().default(false),
    has_schoorsteen: z.boolean().default(false),
    has_aquaplan: z.boolean().default(false),
    option_unknown: z.boolean().default(false),
});
type QuoteDakReinigingAddSchema = z.infer<typeof quoteDakreinigingAddSchema>;

export { quoteDakreinigingAddSchema };
export type { QuoteDakReinigingAddSchema };

export async function createDakreinigingQuote(quote: QuoteDakReinigingAddSchema): Promise<QuoteAddResponse> {
    const supabase = await createClient();

    const { error, data } = await supabase.from('dakreiniging_quotes').insert(
        quote
    ).select('id').single();

    return { error, data };
}

export function convertToDakreinigingQuoteSchema(formData: DakReinigingFormData, quoteData: ContractorDakreinigingQuote): QuoteDakReinigingAddSchema {
    return {
        address: formData.address,
        surface_in_sq_meter: formData.roofSize,
        contractor_id: formData.selectedContractor!.id,
        has_gootsystemen: formData.options.gootsystemen,
        has_dakramen: formData.options.veluxramen,
        has_zonnepanelen: formData.options.zonnepanelen,
        has_dakbedekking: formData.options.dakbedekking,
        has_schoorsteen: formData.options.schoorsteen,
        has_aquaplan: formData.options.aquaplan,
        option_unknown: formData.options.optionUnknown,
        total_price: quoteData.totalPrice,
    }
}

/* Create Dakrenovatie quote */
const quoteDakrenovatieExtrasSchema = z.object({
    has_dak_isolatie: z.boolean().default(false),
    has_gevel_bekleding: z.boolean().default(false),
    has_zonnepanelen: z.boolean().default(false),
    has_dakramen: z.boolean().default(false),
    has_dakgoten: z.boolean().default(false),
})
const quoteDakrenovatieAddSchema = z.object({
    address: z.string().min(4, { message: "Ongeldig adres" }),
    surface_in_sq_meter: z.coerce.number().min(1, { message: "Ongeldige waarde" }),
    contractor_id: z.string().min(0, { message: "Ongeldige waarde" }),
    extras: quoteDakrenovatieExtrasSchema,
    roofing_type_id: z.number().min(0, { message: "Ongeldige waarde" }),
    total_price: z.number().min(0, { message: "Ongeldige waarde" }),
    dakraam: z.string().default('geen'),
    insulation: z.string().default('geen'),
    dakgoten: z.string().default('niet vervangen'),
});
type QuoteDakRenovatieAddSchema = z.infer<typeof quoteDakrenovatieAddSchema>;

export { quoteDakrenovatieAddSchema };
export type { QuoteDakRenovatieAddSchema };

export async function createDakrenovatieQuote(quote: QuoteDakRenovatieAddSchema): Promise<QuoteAddResponse> {
    const supabase = await createClient();

    // insert extras
    const { error: extras_error, data: extras_data } = await supabase.from('dakbedekking_quote_extras').insert(
        quote.extras
    ).select('id').single();

    const { extras, ...quoteToInsert } = quote;

    if (!extras_error) {
        const { error, data } = await supabase.from('dakbedekking_quotes').insert(
            { ...quoteToInsert, extras_id: extras_data.id }
        ).select('id').single();
        return { error, data };
    }

    return { error: extras_error, data: null };
}

export function convertToDakrenovatieQuoteSchema(formData: FormData, quoteData: ContractorDakrenovatieQuote): QuoteDakRenovatieAddSchema {
    let roofing_type_id = 0;
    if (formData.roofType === 'dakpannen') {
        if (formData.roofColor === 'antraciet') {
            roofing_type_id = 1
        } else if (formData.roofColor === 'rood') {
            roofing_type_id = 2
        }
    } else if (formData.roofType === 'leien') {
        if (formData.roofColor === 'natuurleien') {
            roofing_type_id = 3
        } else if (formData.roofColor === 'kunstleien') {
            roofing_type_id = 4
        }
    }
    return {
        address: formData.address,
        surface_in_sq_meter: formData.roofSize,
        contractor_id: formData.selectedContractor!.id,
        extras: {
            has_dak_isolatie: formData.extras.insulation,
            has_gevel_bekleding: formData.extras.facadeCladding,
            has_zonnepanelen: formData.extras.solarPanels,
            has_dakramen: formData.extras.skylights,
            has_dakgoten: formData.extras.gutters,
        },
        roofing_type_id: roofing_type_id,
        total_price: quoteData.totalPrice,
        dakraam: formData.dakraam,
        insulation: formData.insulation,
        dakgoten: formData.dakgoten
    }
}

/* Appointment request */
const appointmentRequestSchema = z.object({
    fullname: z.string().min(2, { message: "Ongeldige naam" }),
    address: z.string().min(4, { message: "Ongeldig adres" }),
    email: z.string().email({ message: "Ongeldig e-mailadres" }),
    telephone: z.string().regex(/^\+?[0-9\s\-]{7,15}$/, {
        message: 'Ongeldig telefoonnummer',
    }),
    status: z.string().default('offerte_aangemaakt')
});
type AppointmentRequestSchema = z.infer<typeof appointmentRequestSchema>;

export { appointmentRequestSchema };
export type { AppointmentRequestSchema };
export type AppointmentRequestResponse = { error: any, data: { id: string } | null };
export type AppointmentRequestsResponse = { error: any, data: any[] | null };
export type AppointmentRequestStatus = 'dakinspectie_gevraagd' | 'offerte_aangemaakt';

export async function createAppointmentRequest(customerData: AppointmentRequestSchema): Promise<AppointmentRequestResponse> {
    const supabase = await createClient();

    //const { quote_id, quote_type, ...customerDataInsert } = customerData;
    const { error, data } = await supabase.from('appointment_requests').insert(
        customerData
    ).select('id').single();

    if (!error) {
        const { error: join_error, data: join_data } = await supabase.from('appointment_quotes').insert(
            {
                appointment_id: data.id,
                //quote_type: quote_type,
                //quote_id: quote_id
            }
        );
    }

    return { error, data };
}

/* Quote completion */
const quoteCompletionSchema = z.object({
    fullname: z.string().min(2, { message: "Ongeldige naam" }),
    address: z.string().min(4, { message: "Ongeldig adres" }),
    email: z.string().email({ message: "Ongeldig e-mailadres" }),
    telephone: z.string().regex(/^\+?[0-9\s\-]{7,15}$/, {
        message: 'Ongeldig telefoonnummer',
    }),
    status: z.string().default('offerte_aangemaakt'),
});
type QuoteCompletionSchema = z.infer<typeof quoteCompletionSchema>;

export { quoteCompletionSchema };
export type { QuoteCompletionSchema };