/**
 * Adds map to the UI
 * @param {String} mapLocations JSON string of maps
 * @param {String} mapboxKey Mapbox Key
 */
const showLocationMap = (mapLocations, mapboxKey) => {
  try {
    // check is we have mapBoxKey
    if (!mapLocations || !mapboxKey)
      throw new Error('Map locations or public key missing');

    // Get locations
    const locations = JSON.parse(mapLocations);

    if (!locations) throw new Error('Could not parse map location correctly');

    // Access Token
    mapboxgl.accessToken = mapboxKey;

    // Init Map
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/marknjo/cks5s76x25pts18o4tjpaqor0',
      scrollZoom: false,
    });

    // Set Map bounds
    const bounds = new mapboxgl.LngLatBounds();

    // Define markers and popup
    locations.forEach(loc => {
      // Create a map pin element
      const marker = document.createElement('div');
      marker.className = 'marker';

      // Add a marker on the map
      new mapboxgl.Marker({
        element: marker,
        anchor: 'bottom',
      })
        .setLngLat(loc.coordinates)
        .addTo(map);

      // Add a popup on the map
      new mapboxgl.Popup({ offset: 30 })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day}: ${loc.description} </p>`)
        .addTo(map);

      bounds.extend(loc.coordinates);
    });

    // Place map on teh DOM
    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        right: 100,
        left: 100,
      },
    });
  } catch (error) {
    /// Catch errors heres
    // TODO Implement messaging
    console.log(error.name);
    console.error(error);
  }
};

// Export
export default showLocationMap;
