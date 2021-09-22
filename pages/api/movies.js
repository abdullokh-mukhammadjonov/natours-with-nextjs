import dbConnect from 'api-lib/database/db_mongo';

export default async (req, res) => {
  const client = await dbConnect
  const movies = await client.db('natours')
    .collection("tours")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();
  // console.log(stringify(client))
  res.json(movies);
};