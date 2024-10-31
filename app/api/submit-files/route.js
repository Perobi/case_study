import { NextResponse } from "next/server";
import Airtable from "airtable";

const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
const AIRTABLE_BASE = process.env.NEXT_PUBLIC_AIRTABLE_BASE;
const TABLE_NAME = "Table 1";

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE);

// Function to upload a file to File.io and get the public URL
const uploadFileToTemporaryService = async (file) => {
  const url = "https://file.io/";
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (data.link) {
    return { url: data.link }; // The public URL for the uploaded file
  } else {
    throw new Error("Failed to upload file: " + data.message);
  }
};

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Get separate files for objektfotos and unterlagen
    const objektfotos = formData.getAll("objektFotos"); // Adjusted key name to match client-side
    const unterlagen = formData.getAll("gebaudeUnterlagen"); // Adjusted key name to match client-side

    // Upload all objektfotos and unterlagen files
    const uploadedObjektfotos = await Promise.all(
      objektfotos.map((file) => uploadFileToTemporaryService(file))
    );

    const uploadedUnterlagen = await Promise.all(
      unterlagen.map((file) => uploadFileToTemporaryService(file))
    );

    // Prepare the data for Airtable with separate attachments for each column
    const createdRecord = await base(TABLE_NAME).create({
      objektfotos_attachments: uploadedObjektfotos.map((file) => ({
        url: file.url,
      })), // Attach the uploaded objektfotos URLs
      unterlagen_attachments: uploadedUnterlagen.map((file) => ({
        url: file.url,
      })), // Attach the uploaded unterlagen URLs
      user_email: formData.get("userEmail"),
      user_first_name: formData.get("userFirstName"),
      user_last_name: formData.get("userLastName"),
      user_phone: formData.get("userPhone"),
      user_address: formData.get("userAddress"),
    });

    return NextResponse.json({
      success: true,
      createdRecord,
    });
  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    ); // Set status code to 500
  }
}
