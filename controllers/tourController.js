// IMPORT MODULES
// 3rd Party Locals

// HELPER FUNCTIONS @TODO: Export them to separate utility file
// MIDDLEWARES HANDLERS  @TODO: Export them to separate utility file
// SINGLE FEATURE HANDLERS
// @TODO: Implement (alias - middlewares) getCheapestTours, getTopRatedTours
// CRUD HANDLERS
// @TODO: Implement getAllTours, getTour, createTour, updateTour, deleteTour
/**
 * Get A single Tour
 */
export const getAllTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours: 'To be implemented soon...',
    },
  });
};

// AGGREGATE HANDLERS
// @TODO: Implement getToursStatsByDifficulty, getMontlyPlans
