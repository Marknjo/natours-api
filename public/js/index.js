// IMPORTS
//import showLocationMap from './modules/locationsMap.js';

/// GET DOM ELEMENTS
/**
 * Map Element
 */
const mapEl = document.getElementById('map');

/// COFIGURE DIFFERENT SCRIPTS

/**
 * Get Map If it is set
 */
if (mapEl) {
  //showLocationMap(mapEl.dataset.locations);

  const initMap = async () => {
    try {
      // Must use keyword deafult for default imports
      const { default: showLocationMap } = await import(
        /* webpackChunkName: "locationMap" */
        './modules/locationsMap.js'
      );

      //get
      showLocationMap(mapEl.dataset.locations);
    } catch (error) {
      // TODO Add support for handling notification -> Error type here
      console.log('Could not load the MAP');

      // FIXME Remove this console log
      console.log(error);
    }
  };

  initMap();
}
