"use client";

import React, { useCallback, useState, useRef } from "react";
import classes from "./google-map.module.css";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";

import { useBooking } from "@/app/context/angebot-context"; // Adjust the path as needed

import pickup from "@/public/assets/maps/pickup_point.svg";
import dropoff from "@/public/assets/maps/dropoff_point.svg";

const containerStyle = {
  width: "100%",
  height: "800px",
};

const defaultCenter = {
  lat: 52.520008,
  lng: 13.404954,
};

const GoogleMapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const { updateBookingDetails } = useBooking(); // Get the context update function
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const hasFetched = useRef(false);

  // Define ICON_SIZE conditionally
  const ICON_SIZE = isLoaded ? new window.google.maps.Size(163, 90) : null;

  const fetchPlaceDetails = useCallback(async (originId, destinationId) => {
    if (!originId || !destinationId) {
      throw new Error("Both originId and destinationId are required");
    }

    const response = await fetch(
      `/api/fetch-place-details?originId=${encodeURIComponent(
        originId
      )}&destinationId=${encodeURIComponent(destinationId)}`
    );
    if (!response.ok)
      throw new Error(`Error fetching place details: ${response.statusText}`);

    const data = await response.json();
    console.log("Fetched place details:", data);

    return {
      origin: data.origin,
      destination: data.destination,
      quotes: data.quotes, // Assuming quotes are in the response as an array
    };
  }, []);

  const handleDirections = useCallback((origin, destination) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Error fetching directions:", result);
        }
      }
    );
  }, []);

  const updateMapBounds = useCallback(
    (map, originLatLong, destinationLatLong) => {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(originLatLong);
      bounds.extend(destinationLatLong);

      // Expand the bounds by a factor
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();

      // Calculate the difference for the expansion
      const latDiff = (ne.lat() - sw.lat()) * 0.5; // 50% expansion vertically
      const lngDiff = (ne.lng() - sw.lng()) * 0.5; // 50% expansion horizontally

      // Adjust the bounds
      bounds.extend({
        lat: sw.lat() - latDiff,
        lng: sw.lng() - lngDiff,
      });
      bounds.extend({
        lat: ne.lat() + latDiff,
        lng: ne.lng() + lngDiff,
      });

      // Fit the map to the adjusted bounds
      map.fitBounds(bounds);

      // Calculate mid-point of the bounds
      const adjustedNe = bounds.getNorthEast();
      const adjustedSw = bounds.getSouthWest();

      const midLat = (adjustedNe.lat() + adjustedSw.lat()) / 2;
      const midLng = (adjustedNe.lng() + adjustedSw.lng()) / 2 - lngDiff; // Center in the right half

      // Center the map with the adjusted mid-point
      map.setCenter({ lat: midLat, lng: midLng });
    },
    []
  );

  const onLoad = useCallback(
    async (map) => {
      const params = new URLSearchParams(window.location.search);
      const originId = params.get("pickup");
      const destinationId = params.get("dropoff");

      if (!originId || !destinationId || hasFetched.current) return;

      hasFetched.current = true; // Mark as fetched

      try {
        const { origin, destination, quotes } = await fetchPlaceDetails(
          originId,
          destinationId
        );

        const originLatLong = {
          lat: origin.coordinates.lat,
          lng: origin.coordinates.lng,
        };
        const destinationLatLong = {
          lat: destination.coordinates.lat,
          lng: destination.coordinates.lng,
        };

        // Set origin and destination
        setOrigin(originLatLong);
        setDestination(destinationLatLong);

        // Fetch directions
        handleDirections(originLatLong, destinationLatLong);

        // Update the map bounds and center
        updateMapBounds(map, originLatLong, destinationLatLong);

        // Set the map reference
        setMap(map);

        // Update the booking context with origin, destination, and quotes
        updateBookingDetails({
          origin,
          destination,
          quotes, // Store quotes in context
        });
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    },
    [fetchPlaceDetails, handleDirections, updateBookingDetails, updateMapBounds]
  );

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        zoomControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        gestureHandling: "none",
        scrollwheel: false,
        streetViewControl: false,
      }}
    >
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: getComputedStyle(document.documentElement)
                .getPropertyValue("--theme-primary")
                .trim(),
              strokeWeight: 10,
            },
            suppressMarkers: true,
            preserveViewport: true,
          }}
        />
      )}

      {origin && ICON_SIZE && (
        <Marker
          position={origin}
          title="Pickup Location"
          icon={{
            url: pickup.src,
            scaledSize: ICON_SIZE,
          }}
        />
      )}

      {destination && ICON_SIZE && (
        <Marker
          position={destination}
          title="Dropoff Location"
          icon={{
            url: dropoff.src,
            scaledSize: ICON_SIZE,
          }}
        />
      )}
    </GoogleMap>
  ) : (
    <div className={classes.placeholderMap}></div>
  );
};

export default React.memo(GoogleMapComponent);
