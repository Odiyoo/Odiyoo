import { sendCustomerServiceInquiry, sendInquiryConfirmation } from "@/domain/mail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json()
    await sendCustomerServiceInquiry(body.formData)
    await sendInquiryConfirmation(body.formData)
    return NextResponse.json({ message: "Mail verzonden." }, { status: 200 });
}