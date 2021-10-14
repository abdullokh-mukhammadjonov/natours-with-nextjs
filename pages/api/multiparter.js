import multer from 'multer';
import nc from 'next-connect'
import all from 'api-lib/middlewares/all'
// import {uploadTourImages, resizeTourImages} from 'api-lib/controllers/tourController'
import multiparty from 'multiparty'
import sharp from 'sharp'

const route = all({ attachParams: true })




// middleware
// const middleware = nc()

// middleware.use(async (req, res, next) => {
//   const form = new multiparty.Form()

//   await form.parse(req, function (err, fields, files) {
//     req.body = fields
//     req.files = files
//     next()
//   })
// })











const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

export const uploadTourImages = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'images', maxCount: 3 }
]);

// upload.single('image') req.file
// upload.array('images', 5) req.files

export const resizeTourImages = async (req, res, next) => {
  if (!req.files.coverImage || !req.files.images) return next();
  console.log("detected image")
  // 1) Cover image
  req.body.coverImage = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.coverImage[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/tours/${req.body.coverImage}`);

  // 2) Images
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/tours/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
}





















    
route
  .use(uploadTourImages)
  .use(resizeTourImages)
  .post((req, res) => {
    console.log("body",req.body)
    console.log("files",req.files)
    res.send("multipart")
  })

export const config = {
  api: {
    bodyParser: false,
  }
}

export default route