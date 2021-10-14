import { protect, restrictTo } from 'api-lib/controllers/authController'
import { getAllUsers, createUser } from 'api-lib/controllers/userController'
import all from 'api-lib/middlewares/all';

const route = all()

route.use(protect)             // rotect the route
     .use(restrictTo('admin')) // restrict the route to admin
     .use((req, res, next) => { console.log("passed"); next(); })
     .get(getAllUsers)
     .post(createUser)

export default route;