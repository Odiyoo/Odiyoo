import { signup, signupSchema } from "@/domain/auth";
import { createClient } from "@/util/supabase/server";
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  if (req.method !== "POST") return new NextResponse(null, {status: 405});
  const body = await req.json();
  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Ongeldige invoer" }, { status: 400 })
  }

  const response = await signup(parsed.data);

  if (response.error) {
    console.log(response.error)
    return NextResponse.json({ message: "Er is iets fout gelopen." }, { status: 401 });
  }

  return NextResponse.json({ data: response }, { status: 200 })
}