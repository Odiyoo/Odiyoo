
import { FormData } from '@/app/quote/page'
import { Resend } from 'resend'
import { ContractorQuote } from './contractors'
import { NewQuoteMail } from './emails/NewQuote'
import { ReactNode } from 'react'

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
    })
    console.log(`Sent mail to ${to}`);
}

export const sendQuoteToCustomer = async (formData: FormData, quoteData: ContractorQuote) => {
    await sendMail({
        to: [formData.email],
        subject: 'Je dakofferte is klaar!',
        react: NewQuoteMail({ formData, quoteData, afspraakToken: "" }),
    })
}