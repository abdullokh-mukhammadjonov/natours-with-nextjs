import all from 'api-lib/middlewares/all'
import { aliasTopTours, getAllTours } from 'api-lib/controllers/tourController'

const route = all()

route.use(aliasTopTours, getAllTours)
    
route
  .get((req, res) => { res.json({ status: 'success', message: 'tours' }) })

export default route