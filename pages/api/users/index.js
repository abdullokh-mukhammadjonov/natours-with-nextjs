import dbConnect from 'api-lib/database/db_mongoose'
import Tour from 'api-lib/database/models/tourModel'
import all from 'api-lib/middlewares/all';



const handler = all()

const dataData = {"name":"The Snow Adventurer","duration":4,"maxGroupSize":10,"difficulty":"difficult","ratingsAverage":4.5,"ratingsQuantity":6,"price":997,"summary":"Exciting adventure in the snow with snowboarding and skiing","description":"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum!\nDolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, exercitation ullamco laboris nisi ut aliquip. Lorem ipsum dolor sit amet, consectetur adipisicing elit!","imageCover":"tour-3-cover.jpg","images":["tour-3-1.jpg","tour-3-2.jpg","tour-3-3.jpg"],"startDates":["2022-01-05T10:00:00.000Z","2022-02-12T10:00:00.000Z","2023-01-06T10:00:00.000Z"],"secretTour":false,"startLocation":{"type":"Point","coordinates":[-106.822318,39.190872],"address":"419 S Mill St, Aspen, CO 81611, USA","description":"Aspen, USA"},"locations":[{"type":"Point","coordinates":[-106.855385,39.182677],"description":"Aspen Highlands","day":1,"_id":"5c88fa8cf4afda39709c295c"},{"type":"Point","coordinates":[-106.516623,39.60499],"description":"Beaver Creek","day":2,"_id":"5c88fa8cf4afda39709c295b"}],"guides":["5c8a21d02f8fb814b56fa189","5c8a23412f8fb814b56fa18c","5c8a1f4e2f8fb814b56fa185"]}

handler.get(async (req, res) => {
  await dbConnect()
  const tours = await Tour.find({})
  return res.status(200).json({message: "got data successfully", tours})
})

export default handler;