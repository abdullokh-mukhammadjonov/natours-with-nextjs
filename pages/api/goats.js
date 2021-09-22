import dbConnect from 'api-lib/database/db_mongoose'
import Pet from 'api-lib/database/models/petModel'
import all from 'api-lib/middlewares/all';


const handler = all();

handler.get(async (req, res) => {
  await dbConnect()
  const pets = await Pet.find({}) /* find all the data in our database */
  res.status(200).json({ success: true, data: pets })
})

handler.post(async (req, res) => {
  const pet = await Pet.create(req.body) /* create a new model in the database */
  res.status(201).json({ success: true, data: pet })
})

export default handler;
