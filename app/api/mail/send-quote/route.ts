import { sendQuoteToCustomer } from "@/domain/mail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json()
    const res = await sendQuoteToCustomer(body.formData, body.quoteData)
    return NextResponse.json({ message: "Mail verzonden." }, { status: 200 });
}