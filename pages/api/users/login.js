import { login } from 'api-lib/controllers/authController'
import all from 'api-lib/middlewares/all';

const route = all()

route.post(login)

export default route;