import { NextResponse } from "next/server";
import Airtable from "airtable";

const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
const AIRTABLE_BASE = process.env.NEXT_PUBLIC_AIRTABLE_BASE;
const TABLE_NAME = "Table 1";

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE);

// Function to upload a file to File.io and get the public URL with a delay
const uploadFileToTemporaryService = async (file) => {
  const url = "https://file.io/";
  const formData = new FormData();
  formData.append("file", file);

  // Introduce a delay to avoid hitting the rate limit
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Wait for a short period before uploading
  await delay(500); // Adjust the delay time as necessary (500 ms as an example)

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

    // Check for required fields
    const userEmail = formData.get("userEmail");
    const userFirstName = formData.get("userFirstName");
    const userLastName = formData.get("userLastName");
    const userPhone = formData.get("userPhone");

    if (!userEmail || !userFirstName || !userLastName || !userPhone) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Bitte stellen Sie sicher, dass alle erforderlichen Felder ausgefüllt sind.",
        },
        { status: 400 } // Bad Request status
      );
    }

    // Get separate files for objektfotos and unterlagen
    const objektfotos = formData.getAll("objektFotos");
    const unterlagen = formData.getAll("gebaudeUnterlagen");

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
