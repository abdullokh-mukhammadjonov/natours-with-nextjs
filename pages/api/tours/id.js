import all from 'api-lib/middlewares/all'

import { 
  getTour, 
  uploadTourImages, 
  resizeTourImages, 
  updateTour } from 'api-lib/controllers/tourController'
import fileUploads from 'api-lib/middlewares/fileUploads'
import { protect, restrictTo } from 'api-lib/controllers/authController'

const route = all()
    
route
  .get(getTour)
  // .use(protect)
  // .use(restrictTo('admin', 'lead-guide'))
  // .use(fileUploads)
  // .use(uploadTourImages)
  // .use(resizeTourImages)
  .patch(async (req, res) => {

    const type = req.imageCover ? req.imageCover : "no"
    const files = req.files ? req.files : "no"
    let images = req?.files?.images || "no"
    res.json({type, files, images})
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default route





// app.post('/api/image-upload', singleUploadCtrl, (req, res) => {
//   try {
//     if (!req.file) { throw new Error('Image is not presented!'); }
//     console.log(req.file);
   
//     return res.json({message: 'Huraaaay'});
//   } catch(e) {
//     return res.status(422).send({message: e.message})
//   }
// })






// const multer = require('multer');

// const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/jpg'];

// const storage = multer.memoryStorage();
// const upload = multer({
//   storage,
//   fileFilter: function(req, file, cb) {
//     if (ALLOWED_FORMATS.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Not supported file type!'), false);
//     }
//   }
// })

// const singleUpload = upload.single('image');
// const singleUploadCtrl = (req, res, next) => {
//   singleUpload(req, res, (error) => {
//     if (error) {
//       return res.status(422).send({message: 'Image upload fail!'});
//     }

//     next();
//   })
// }





// router
//   .patch(
//     tourController.uploadTourImages,
//     tourController.resizeTourImages,
//     tourController.updateTour
//   )
//   .delete(
//     authController.protect,
//     authController.restrictTo('admin', 'lead-guide'),
// //     tourController.deleteTour
// //   );
// export default mainRoute