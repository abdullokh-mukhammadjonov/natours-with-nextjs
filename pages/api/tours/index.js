import { getAllTours, createTour } from 'api-lib/controllers/tourControllers';
import all from 'api-lib/middlewares/all';

const handler = all();

handler.get(async (req, res) => {
  const posts = await getAllTours();

  return res.json({status: 200, message: "successfully fetched tours", data: posts});
});


handler.post(async (req, res) => {
  const tour = await createTour(req)

  return res.json({status: 200, message: "successfully creates tour", tour});
});




export default handler