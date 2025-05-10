import { getQuotes } from "@/domain/quoting";
import { createQuote, quoteAddSchema } from "@/domain/services/roofing";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  if (req.method !== "GET") return new NextResponse(null, {status: 405});

  const response = await getQuotes();

  if (response.error) {
    console.log(response.error);
    return NextResponse.json({ message: "Er is iets fout gelopen." }, { status: 401 });
  }

  return NextResponse.json({ data: response.data }, { status: 200 })
}

export async function POST(req: NextRequest) {
  if (req.method !== "POST") return new NextResponse(null, {status: 405});

  const body = await req.json();
  const parsed = quoteAddSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Ongeldige invoer" }, { status: 400 })
  }

  const response = await createQuote(parsed.data);

  if (response.error) {
    console.log(response.error);
    return NextResponse.json({ message: "Er is iets fout gelopen." }, { status: 401 });
  }

  return NextResponse.json({ data: response.data }, { status: 200 })
}




