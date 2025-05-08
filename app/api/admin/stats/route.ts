import { getColdQuoteCount, getContractorCountByStatus, getCustomerCount, getRecentColdQuotes } from "@/domain/stats";
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
  if (req.method !== "GET") return new NextResponse(null, {status: 405});

  try {
    const activeContractorCount = await getContractorCountByStatus(true);
    const customerCount = await getCustomerCount();
    const coldQuoteCount = await getColdQuoteCount();
    const recentColdQuotes = await getRecentColdQuotes();

    return NextResponse.json({ data: { activeContractorCount, customerCount, coldQuoteCount, recentColdQuotes } }, { status: 200 })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Er is iets fout gelopen." }, { status: 401 });
  }
  
}