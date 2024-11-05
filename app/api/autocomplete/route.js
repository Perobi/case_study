// api/autocomplete/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!query || !apiKey) {
    return new Response(JSON.stringify({ error: "Missing query or API key" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        query
      )}&components=country:de&key=${apiKey}` // Add components parameter to restrict to Deutschland! (for now at least)
    );
    const data = await response.json();

    // Check if the response is valid
    if (data.status === "OK") {
      const formattedData = {
        data: {
          autocompleteLocations: data.predictions
            // .filter(
            //   (prediction) =>
            //     prediction.types && prediction.types.includes("street_address") // Only include street addresses
            // )
            .map((prediction) => ({
              __typename: "AutocompleteLocation",
              id: prediction.place_id, // Use place_id as ID
              title: prediction.structured_formatting.main_text,
              subtitle: prediction.structured_formatting.secondary_text,
            })),
        },
      };

      return new Response(JSON.stringify(formattedData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // If no predictions are found, return an empty array instead of an error
    if (data.status === "ZERO_RESULTS" || data.predictions.length === 0) {
      return new Response(
        JSON.stringify({ data: { autocompleteLocations: [] } }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Handle other potential error statuses
    return new Response(JSON.stringify({ error: data.error_message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch from Google API" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
