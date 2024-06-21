import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function Map() {
  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyB4ArrvGWKckC_CO_Tx70yBoqElFuvtLy4",
      version: "weekly",
      libraries: ["places", "marker",], // Include the marker library
    });

    loader.load().then(async() => {
      const position = { lat: -1.28333 , lng: 36.81667 };
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const map = new Map(document.getElementById("map") as HTMLElement, {
        zoom: 8,
        center: position,
        mapId: "DEMO_MAP_ID", // Map ID is required for advanced markers.
      });

      // The advanced marker, positioned at Uluru
       new google.maps.marker.AdvancedMarkerElement({
        map,
        position: position,
        title: "Uluru",
      });
    });
  }, []);

  return <div id="map" className="w-full h-[400px]"></div>;
}

export default Map;
