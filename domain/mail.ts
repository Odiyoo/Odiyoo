
import { FormData } from '@/app/quote/dakrenovatie/Form'
import { FormData as DakreinigingFormData } from '@/app/quote/dakreiniging/Form'
import { Resend } from 'resend'
import { ContractorDakreinigingQuote, ContractorDakrenovatieQuote } from './contractors'
import { NewQuoteMail } from './emails/NewQuote'
import { AppointmentRequestSchema } from './services/roofing'
import { NewLeadMail } from './emails/NewLead'
import { NewDakreinigingQuoteMail } from './emails/NewDakreinigingQuote'

const resend = new Resend('re_J2gkf18n_ECx7BQwobmH2qWg72gZ2Li8Z')
const FROM_MAIL = "info@omegauna.be"

export type SendMailProps = {
    from?: string,
    to: string[],
    subject: string,
    html?: string,
    react: any //ReactNode
}

export const sendMail = async ({ from, to, subject, html, react }: SendMailProps) => {
    console.log(`Sending mail: ${subject}`);
    if (!from) from = FROM_MAIL
    await resend.emails.send({
        from,
        to,
        subject: `Odiyoo | ${subject}`,
        html,
        react,
        // TODO: attachments
    })
    console.log(`Sent mail to ${to}`);
}

export const sendQuoteToCustomer = async (formData: FormData, quoteData: ContractorDakrenovatieQuote, customerData: AppointmentRequestSchema, appointment_id: string) => {
    await sendMail({
        to: [customerData.email],
        subject: 'Je dakofferte is klaar!',
        react: NewQuoteMail({ formData, quoteData, afspraakToken: appointment_id }),
    })
}

export const sendDakreinigingQuoteToCustomer = async (formData: DakreinigingFormData, quoteData: ContractorDakreinigingQuote, customerData: AppointmentRequestSchema, appointment_id: string) => {
    await sendMail({
        to: [customerData.email],
        subject: 'Je dakofferte is klaar!',
        react: NewDakreinigingQuoteMail({ formData, quoteData, afspraakToken: appointment_id }),
    })
}

export const sendConfirmationMailToLead = async (customerData: AppointmentRequestSchema, appointment_id: string) => {
    await sendMail({
        to: [customerData.email],
        subject: 'We hebben je aanvraag ontvangen!',
        react: NewLeadMail({ customerData, afspraakToken: appointment_id }),
    })
}