// app/api/dam/route.ts — Route Handler data bendungan
import { NextResponse } from "next/server";
import { mockDam } from "@/data/mock-dam";

export async function GET() {
  return NextResponse.json(mockDam);
}
