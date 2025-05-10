import { sendConfirmationMailToLead } from "@/domain/mail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json()
    const res = await sendConfirmationMailToLead(body.customerData, body.appointment_id)
    return NextResponse.json({ message: "Mail verzonden." }, { status: 200 });
}