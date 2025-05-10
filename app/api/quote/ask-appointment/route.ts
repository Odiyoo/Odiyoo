import { getContractors, createContractor, contractorAddSchema } from "@/domain/contractors";
import { appointmentRequestSchema, createAppointmentRequest, createQuote } from "@/domain/services/roofing";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  if (req.method !== "POST") return new NextResponse(null, {status: 405});

  const body = await req.json();
  const parsed = appointmentRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Ongeldige invoer" }, { status: 400 })
  }

  const create_quote_response = await createQuote(parsed.data);
  const create_appointment_response = await createAppointmentRequest(parsed.data, create_quote_response.data.id);

  if (create_quote_response.error || create_appointment_response.error) {
    console.log(create_appointment_response.error);
    return NextResponse.json({ message: "Er is iets fout gelopen." }, { status: 401 });
  }

  return NextResponse.json({ data: create_quote_response.data }, { status: 200 })
}




