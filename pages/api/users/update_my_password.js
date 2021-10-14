import { protect, updatePassword } from 'api-lib/controllers/authController';
import all from 'api-lib/middlewares/all';

const route = all()

// Protect the route
route.use(protect).patch(updatePassword);

export default route;