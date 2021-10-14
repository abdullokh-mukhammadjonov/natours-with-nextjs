import { protect, restrictTo } from 'api-lib/controllers/authController'
import { getUser, updateUser, deleteUser } from 'api-lib/controllers/userController'
import all from 'api-lib/middlewares/all';

const route = all()

route.use(protect)             // rotect the route
     .use(restrictTo('admin')) // restrict the route to admin
     .get(getUser)
     .patch(updateUser)
     .delete(deleteUser)

export default route;