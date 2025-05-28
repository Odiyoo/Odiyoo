import { createClient } from "@/util/supabase/server";
import { z } from "zod";
import { Tables } from "@/lib/supabase.types";
import moment from "moment";

export type RepresentativeAppointment = Tables<'representative_appointments'>;
/*export type ExtendedRepresentativeAppointment = RepresentativeAppointment & {
    appointment_quotes: {
        appointment_id: string,
        quote_type: string,
        quote_id: string,
    }[]*/

/* Appointment: odiyoo representative */
const representativeAppointmentSchema = z.object({
    service_id: z.string().nullable(),
    datetime_planned: z.date().or(z.string()), //.min(moment(), 'Datum kan niet in het verleden liggen.'),
    fullname: z.string().min(2, { message: "Ongeldige naam" }),
    address: z.string().min(4, { message: "Ongeldig adres" }),
    email: z.string().email({ message: "Ongeldig e-mailadres" }),
    telephone: z.string().regex(/^\+?[0-9\s\-]{7,15}$/, {
        message: 'Ongeldig telefoonnummer',
    }),
    status: z.string().default('open')
});
type RepresentativeAppointmentSchema = z.infer<typeof representativeAppointmentSchema>;

export { representativeAppointmentSchema };
export type { RepresentativeAppointmentSchema };
export type RepresentativeAppointmentResponse = { error: any, data: { id: string } | null } | { message: string, errors: any };
export type RepresentativeAppointmentsResponse = { error: any, data: any[] | null };
export type RepresentativeAppointmentStatus = 'dakinspectie_gevraagd' | 'offerte_aangemaakt';

export async function createAppointmentRepresentative(customerData: RepresentativeAppointmentSchema): Promise<RepresentativeAppointmentResponse> {
    const supabase = await createClient();

    const day = moment(customerData.datetime_planned).locale('en').format('dddd').toLocaleLowerCase('en-US');
    let representative_id = null; //fd7943e0-20fa-429d-8898-c9f1d983bddc

    const { error: representative_error, data: representatives } = await supabase.from('representatives').select(`id`).eq(day, true);

    if (!representatives || representatives.length == 0) return { error: "Er zijn geen vertegenwoordigers beschikbaar.", data: null}

    // loop through available representatives
    for (const repr of representatives) {
        const { error: appointments_error, data: appointments_on_planned_day } = await supabase.from('representative_appointments').select('*').eq('datetime_planned', customerData.datetime_planned).eq('representative_id', repr.id);
        if (appointments_error || appointments_on_planned_day == null) {
            break
        }
        if (appointments_on_planned_day.length >= 4) {
            break
        }
        representative_id = repr.id
    }

    if (representative_id == null) return { error: "Er zijn geen vertegenwoordigers beschikbaar.", data: null}

    const { error, data } = await supabase.from('representative_appointments').insert(
        {...customerData, representative_id}
    ).select('id').single();

    /*if (!error) {
        const { error: join_error, data: join_data } = await supabase.from('appointment_quotes').insert(
            {
                appointment_id: data.id,
                quote_type: quote_type,
                quote_id: quote_id
            }
        );
    }*/

    return { error, data };
}
export async function getRepresentativeAppointments(): Promise<RepresentativeAppointmentsResponse> {
    const supabase = await createClient();

    const { error, data } = await supabase.from('representative_appointments').select('*');

    return { error, data };
}


export type ContractorAppointment = Tables<'contractor_appointments'>;
/*export type ExtendedRepresentativeAppointment = RepresentativeAppointment & {
    appointment_quotes: {
        appointment_id: string,
        quote_type: string,
        quote_id: string,
    }[]*/

/* Appointment: odiyoo representative */
const contractorAppointmentSchema = z.object({
    service_id: z.string().nullable(),
    datetime_planned: z.date().min(new Date(), 'Datum kan niet in het verleden liggen.'),
    fullname: z.string().min(2, { message: "Ongeldige naam" }),
    address: z.string().min(4, { message: "Ongeldig adres" }),
    email: z.string().email({ message: "Ongeldig e-mailadres" }),
    telephone: z.string().regex(/^\+?[0-9\s\-]{7,15}$/, {
        message: 'Ongeldig telefoonnummer',
    }),
    status: z.string().default('dakinspectie_gevraagd')
});
type ContractorAppointmentSchema = z.infer<typeof contractorAppointmentSchema>;

export { contractorAppointmentSchema };
export type { ContractorAppointmentSchema };
export type ContractorAppointmentResponse = { error: any, data: { id: string } | null };
export type ContractorAppointmentsResponse = { error: any, data: any[] | null };
export type ContractorAppointmentStatus = 'dakinspectie_gevraagd' | 'offerte_aangemaakt';

export async function createAppointmentContractor(customerData: ContractorAppointmentSchema): Promise<ContractorAppointmentResponse | false> {
    const supabase = await createClient();

    const datetime_planned = new Date();
    const day = moment(datetime_planned).format('dddd');

    const { error, data } = await supabase.from('contractor_appointments').insert(
        {...customerData, datetime_planned}
    ).select('id').single();

    return { error, data };
}
export async function getContractorAppointments(): Promise<RepresentativeAppointmentsResponse> {
    const supabase = await createClient();

    const { error, data } = await supabase.from('contractor_appointments').select('*');

    return { error, data };
}