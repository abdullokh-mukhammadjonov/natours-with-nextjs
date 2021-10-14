import { forgotPassword } from 'api-lib/controllers/authController'
import all from 'api-lib/middlewares/all';

const route = all()

route.post(forgotPassword)

export default route;