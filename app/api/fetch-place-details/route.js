// /app/api/fetch-place-details/route.js

export async function GET(req) {
  const { searchParams } = new URL(req.url); // Get search parameters from the request URL
  const originId = searchParams.get("originId"); // Extract originId from query parameters
  const destinationId = searchParams.get("destinationId"); // Extract destinationId from query parameters

  if (!originId || !destinationId) {
    return new Response(
      JSON.stringify({ error: "Both originId and destinationId are required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Fetch place details for origin
    const originResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${originId}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );

    // Fetch place details for destination
    const destinationResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${destinationId}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );

    // Wait for both requests to complete
    const [originResult, destinationResult] = await Promise.all([
      originResponse,
      destinationResponse,
    ]);

    // Check if both responses are okay
    if (!originResult.ok || !destinationResult.ok) {
      throw new Error("Failed to fetch place details");
    }

    // Parse the JSON data from both responses
    const originData = await originResult.json();
    const destinationData = await destinationResult.json();

    // Fetch travel distance and duration using the Directions API
    const directionsResponse = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${originData.result.geometry.location.lat},${originData.result.geometry.location.lng}&destination=${destinationData.result.geometry.location.lat},${destinationData.result.geometry.location.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );

    if (!directionsResponse.ok) {
      throw new Error("Failed to fetch travel distance and duration");
    }

    const directionsData = await directionsResponse.json();
    const travelDistance =
      directionsData.routes[0]?.legs[0]?.distance?.value || 0; // in meters
    const travelDuration =
      directionsData.routes[0]?.legs[0]?.duration?.value || 0; // in seconds

    // Combine results into the desired format
    const data = {
      id: `${originId}-${destinationId}-${Date.now()}`, // Unique ID based on origin and destination IDs
      origin: {
        id: originData.result.place_id,
        name: originData.result.name,
        coordinates: originData.result.geometry.location,
        locationType: originData.result.types, // Adjust based on your actual response structure
        address: {
          locality: originData.result.address_components.find((comp) =>
            comp.types.includes("locality")
          )?.long_name,
          number: originData.result.address_components.find((comp) =>
            comp.types.includes("street_number")
          )?.long_name,
          postalCode: originData.result.address_components.find((comp) =>
            comp.types.includes("postal_code")
          )?.long_name,
          region: originData.result.address_components.find((comp) =>
            comp.types.includes("administrative_area_level_1")
          )?.long_name,
          street: originData.result.address_components.find((comp) =>
            comp.types.includes("route")
          )?.long_name,
        },
      },
      destination: {
        id: destinationData.result.place_id,
        name: destinationData.result.name,
        coordinates: destinationData.result.geometry.location,
        locationType: destinationData.result.types, // Adjust based on your actual response structure
        address: {
          locality: destinationData.result.address_components.find((comp) =>
            comp.types.includes("locality")
          )?.long_name,
          number: destinationData.result.address_components.find((comp) =>
            comp.types.includes("street_number")
          )?.long_name,
          postalCode: destinationData.result.address_components.find((comp) =>
            comp.types.includes("postal_code")
          )?.long_name,
          region: destinationData.result.address_components.find((comp) =>
            comp.types.includes("administrative_area_level_1")
          )?.long_name,
          street: destinationData.result.address_components.find((comp) =>
            comp.types.includes("route")
          )?.long_name,
        },
      },

      quotes: [
        {
          product: "XS",
          productObj: {
            id: `product-XS-${originData.result.place_id}-${destinationData.result.place_id}`,
            slug: "XS",
            shortName: "Moverr XS",
            description:
              "Ideal für kleine Umzüge, oder du in der Lage bist zu helfen oder nur einen Moverr brauchst. Kompakte Möbel und Boxen sind kein Problem.",
            crewSize: 1,
          },
          travelDistance: travelDistance, // Travel distance in meters
          travelDuration: travelDuration, // Travel duration in seconds
          averageLaborDuration: 20, // 20 min in seconds

          fareStructure: {
            base: 2600,
            perKm: 196,
            perMinuteLabor: 95,
            perMinuteTravel: 0,
          },
        },
        {
          product: "S",
          productObj: {
            id: `product-S-${originData.result.place_id}-${destinationData.result.place_id}`,
            slug: "S",
            shortName: "Moverr S",
            description:
              "Ideal für ein paar mittelgroße Sachen oder eine kleine Anzahl größerer Gegenstände. Perfekt für ein Sofa, ein Haushaltsgerät oder mehrere große Kartons.",
            crewSize: 2,
          },
          travelDistance: travelDistance, // Travel distance in meters
          travelDuration: travelDuration, // Travel duration in seconds
          averageLaborDuration: 30, // 30 min in seconds

          fareStructure: {
            base: 3800,
            perKm: 224,
            perMinuteLabor: 162,
            perMinuteTravel: 0,
          },
        },
        {
          product: "M",
          productObj: {
            id: `product-M-${originData.result.place_id}-${destinationData.result.place_id}`,
            slug: "M",
            shortName: "Moverr M",
            description:
              "Super für mittelgroße bis größere Umzüge, wie zb. um mehrere Möbelstücke wie eine Wohnzimmereinrichtung oder ein Schlafzimmer-Set zu transportieren.",
            crewSize: 2,
          },
          travelDistance: travelDistance, // Travel distance in meters
          travelDuration: travelDuration, // Travel duration in seconds
          averageLaborDuration: 45, // 45 min in seconds

          fareStructure: {
            base: 6800,
            perKm: 308,
            perMinuteLabor: 202,
            perMinuteTravel: 0,
          },
        },
        {
          product: "L",
          productObj: {
            id: `product-L-${originData.result.place_id}-${destinationData.result.place_id}`,
            slug: "L",
            shortName: "Moverr L",
            description:
              "Perfekt für große Umzüge oder sperrige Gegenstände. Ideal für den Umzug aus einem Studio oder einer Einzimmerwohnung, übergroße Sachen oder Lieferungen für mehrere Räume.",
            crewSize: 2,
          },
          travelDistance: travelDistance, // Travel distance in meters
          travelDuration: travelDuration, // Travel duration in seconds
          averageLaborDuration: 60, // 60 min in seconds

          fareStructure: {
            base: 11700,
            perKm: 370,
            perMinuteLabor: 230,
            perMinuteTravel: 0,
          },
        },
        {
          product: "XL",
          productObj: {
            id: `product-XL-${originData.result.place_id}-${destinationData.result.place_id}`,
            slug: "XL",
            shortName: "Moverr XL",
            description:
              "Hervorragend für größere Hausumzüge und große Lieferungen. Perfekt, um ein 2- bis 3-Zimmer-Wohnung, mehrere große Geräte oder sperrige Möbel zu transportieren.",
            crewSize: 2,
          },
          travelDistance: travelDistance, // Travel distance in meters
          travelDuration: travelDuration, // Travel duration in seconds
          averageLaborDuration: 90, // 90 min in seconds

          fareStructure: {
            base: 15200,
            perKm: 500,
            perMinuteLabor: 300,
            perMinuteTravel: 0,
          },
        },
      ],
    };

    // Return the combined data in the desired format
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Error fetching place details" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
