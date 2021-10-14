import all from 'api-lib/middlewares/all'
import { protect, restrictTo } from 'api-lib/controllers/authController'
import { getMonthlyPlan } from 'api-lib/controllers/tourController'

const route = all()

route.use(protect)
     .use(restrictTo('admin', 'lead-guide', 'guide'))
     .get(getMonthlyPlan)

export default route
