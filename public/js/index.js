// IMPORTS
import showLocationMap from './modules/locationsMap.js';

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
  showLocationMap(mapEl.dataset.locations);
}
