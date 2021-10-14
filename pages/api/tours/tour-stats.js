import all from 'api-lib/middlewares/all'
import { getTourStats } from 'api-lib/controllers/tourController'

const route = all()
    
route
  .get(getTourStats)

export default route