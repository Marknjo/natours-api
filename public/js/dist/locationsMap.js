import { e as errorWrapper } from "./index.js";
const showLocationMap = (mapLocations, mapboxKey) => {
  return errorWrapper(() => {
    if (!mapLocations || !mapboxKey)
      throw new Error("Map locations or public key missing");
    const locations = JSON.parse(mapLocations);
    if (!locations)
      throw new Error("Could not parse map location correctly");
    mapboxgl.accessToken = mapboxKey;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/marknjo/cks5s76x25pts18o4tjpaqor0",
      scrollZoom: false
    });
    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach((loc) => {
      const marker = document.createElement("div");
      marker.className = "marker";
      new mapboxgl.Marker({
        element: marker,
        anchor: "bottom"
      }).setLngLat(loc.coordinates).addTo(map);
      new mapboxgl.Popup({ offset: 30 }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description} </p>`).addTo(map);
      bounds.extend(loc.coordinates);
    });
    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        right: 100,
        left: 100
      }
    });
  });
};
export { showLocationMap as default };
