import { logout } from 'api-lib/controllers/authController';
import all from 'api-lib/middlewares/all';

const route = all()

route.get(logout)

export default route