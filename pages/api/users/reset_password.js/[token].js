import { resetPassword } from 'api-lib/controllers/authController'
import all from 'api-lib/middlewares/all';

const route = all()

route.patch(resetPassword)

export default route;