import { Loader } from "@googlemaps/js-api-loader";

const customWindow = document.querySelector(".popup");

async function initMap() {
    const loader = new Loader({
        apiKey: import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY,
        version: "weekly",
    });

    const { Map } = await loader.importLibrary("maps");
    // const { AdvancedMarkerElement } = await loader.importLibrary("marker");
    // const { InfoWindow } = await loader.importLibrary("streetView");

    const map = new Map(document.getElementById("map"), {
        center: { lat: -25, lng: 135 },
        zoom: 4,
        mapId: "AI_ROBOTS_LOCATIONS",
        disableDefaultUI: true,
        colorScheme: "DARK"
    });

}
initMap();