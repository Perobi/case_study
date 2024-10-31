import { NextResponse } from "next/server";
import Airtable from "airtable";

const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
const AIRTABLE_BASE = process.env.NEXT_PUBLIC_AIRTABLE_BASE;
const TABLE_NAME = "Table 1";

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE);

// Function to upload a file to File.io (free url ersteller) and get the public URL with a delay
const uploadFileToTemporaryService = async (file) => {
  const url = "https://file.io/";
  const formData = new FormData();
  formData.append("file", file);

  // Introduce a delay to avoid hitting the rate limit
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  await delay(500); // bei 500 scheint es gut zu funktionieren

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (data.link) {
    return { url: data.link };
  } else {
    throw new Error("Failed to upload file: " + data.message);
  }
};

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Check for required fields so people can't fidget around with the form elements
    const userEmail = formData.get("userEmail");
    const userFirstName = formData.get("userFirstName");
    const userLastName = formData.get("userLastName");
    const userPhone = formData.get("userPhone");

    // Get files for objektfotos and unterlagen
    const objektfotos = formData.getAll("objektFotos");
    const unterlagen = formData.getAll("gebaudeUnterlagen");

    if (
      !userEmail ||
      !userFirstName ||
      !userLastName ||
      !userPhone ||
      (objektfotos.length === 0 && unterlagen.length === 0)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Bitte stellen Sie sicher, dass alle erforderlichen Felder ausgefüllt sind.",
        },
        { status: 400 } // Bad Request status! No no not allowed sneaky sneaky
      );
    }

    // Upload all objektfotos and unterlagen
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
      })),
      unterlagen_attachments: uploadedUnterlagen.map((file) => ({
        url: file.url,
      })),
      user_email: userEmail,
      user_first_name: userFirstName,
      user_last_name: userLastName,
      user_phone: userPhone,
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
