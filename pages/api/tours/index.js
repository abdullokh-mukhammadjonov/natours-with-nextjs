import all from 'api-lib/middlewares/all'
import { getAllTours, createTour } from 'api-lib/controllers/tourController'
import { protect, restrictTo } from 'api-lib/controllers/authController'

const route = all({ attachParams: true })
    
route
  .get(getAllTours)
  .use(protect)
  .use(restrictTo('admin', 'lead-guide'))
  .post(createTour)

export default route



// router
//   .route('/tours-within/:distance/center/:latlng/unit/:unit')
//   .get(tourController.getToursWithin);
// // /tours-within?distance=233&center=-40,45&unit=mi
// // /tours-within/233/center/-40,45/unit/mi

// router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);


// module.exports = router;