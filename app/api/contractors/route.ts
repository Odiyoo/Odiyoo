import { login, loginSchema } from "@/domain/auth";
import { getContractors } from "@/domain/contractors";
import { createClient } from "@/util/supabase/server";
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
  if (req.method !== "GET") return new NextResponse(null, {status: 405});

  const response = await getContractors();

  if (response.error) {
    console.log(response.error);
    return NextResponse.json({ message: "Er is iets fout gelopen." }, { status: 401 });
  }

  return NextResponse.json({ data: response.data }, { status: 200 })
}