import multer from 'multer';
import nc from 'next-connect'


const route = nc()
 

route
  .get((req, res) => {
    res.send("yes")
  })
  .post((req, res) => {
    req.files && console.log("req.files")
    res.send("wanted: multer")
  })

export const config = {
    api: {
        bodyParser: false,
    },
}

export default route