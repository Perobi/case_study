// pages/api/fetch-user-details.js
import { NextResponse } from "next/server";
import Airtable from "airtable";

const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
const AIRTABLE_BASE = process.env.NEXT_PUBLIC_AIRTABLE_BASE;
const TABLE = process.env.NEXT_PUBLIC_AIRTABLE_LEAD_GENERATION_TABLE_ID;

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" });
    }

    const records = await base(TABLE)
      .select({
        filterByFormula: `{user_email} = '${email}'`, // Adjust according to your Airtable field name
      })
      .firstPage();

    if (records.length === 0) {
      return NextResponse.json({ success: false, message: "No user found" });
    }

    const userDetails = records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));

    return NextResponse.json({ success: true, userDetails });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
