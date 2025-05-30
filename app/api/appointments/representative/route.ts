import { representativeAppointmentSchema, createAppointmentRepresentative } from "@/domain/appointments";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  if (req.method !== "POST") return new NextResponse(null, {status: 405});

  const body = await req.json();
  const parsed = representativeAppointmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Ongeldige invoer", errors: parsed.error }, { status: 400 })
  }

  const response = await createAppointmentRepresentative(parsed.data);

  if (response.error) {
    console.log(response.error);
    return NextResponse.json({ error: "Er is iets fout gelopen." }, { status: 401 });
  }

  return NextResponse.json({ data: response.data }, { status: 200 })
}




