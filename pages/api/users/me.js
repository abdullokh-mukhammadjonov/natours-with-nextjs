import { protect } from 'api-lib/controllers/authController';
import { getUser } from 'api-lib/controllers/userController';
import all from 'api-lib/middlewares/all';

const route = all({ attachParams: true })

// Protect the route
route.use(protect).get(getUser);

export default route;