import { NextResponse } from "next/server";

export function GET() {
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return NextResponse.json({ supabase: { url: hasUrl, key: hasKey } });
}
