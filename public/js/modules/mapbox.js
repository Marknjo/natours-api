// @TODO: Test if Map works
// Display Mapbox Map
const displayMapbox = locations => {
  // GET THE MAP ID
  mapboxgl.accessToken =
    'pk.eyJ1IjoibWFya25qbyIsImEiOiJja3M1cndpamIyaXhkMnFvOXN2cHBwbDdvIn0.6W8GeDyqWPQetlgQGrB1lA';

  // SETUP MAPBOX
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    scrollZoom: false,
  });

  // HANDLE ICON, MESSAGE etc
  const bounds = mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create HTML marker.. Handled by the CSS marker
    const marker = document.createElement('div');
    marker.className = 'marker';

    // Add Marker
    new mapboxgl.Marker({
      element: marker,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add Popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description} </p>`)
      .addTo(map);

    // Set the bounds
    bounds.extend(loc.coordinates);
  });

  // HANDLE PLACEMENT OF THE MAP
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      right: 100,
      left: 100,
    },
  });
};

// export display Mapbox
export default displayMapbox;
