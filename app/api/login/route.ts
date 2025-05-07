import { login, loginSchema } from "@/domain/auth";
import { createClient } from "@/util/supabase/server";
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  if (req.method !== "POST") return new NextResponse(null, {status: 405});
  const body = await req.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Ongeldige invoer" }, { status: 400 })
  }

  const response = await login(parsed.data);

  if (response.error) {
    return NextResponse.json({ message: "Verkeerde inloggegevens" }, { status: 401 });
  }

  return NextResponse.json({ data: { role: response.data.user_role } }, { status: 200 })
}