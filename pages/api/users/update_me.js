import { protect, uploadUserPhoto, resizeUserPhoto, updateMe } from 'api-lib/controllers/authController';
import all from 'api-lib/middlewares/all';

const route = all()

// Protect the route
route.use(protect)
     .use(uploadUserPhoto)
     .use(resizeUserPhoto)
     .patch(updateMe)

export default route;



// router.patch(
//   '/updateMe',
//   userController.uploadUserPhoto,
//   userController.resizeUserPhoto,
//   userController.updateMe
// );