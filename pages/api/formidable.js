import formidable from 'formidable';
import nc from 'next-connect';
import fs from 'fs';
import sharp from 'sharp'

const route = nc()

export const config = {
  api: {
    bodyParser: false
  }
};

const saveFile = async (file) => {
  const data = fs.readFileSync(file.path);
  fs.writeFileSync(`./public/${Date.now()+file.name}`, data);
  await fs.unlinkSync(file.path);
  return;
};


function resize(img) {
  return sharp(img)
    .resize(500, 500, {
      fit: 'inside', // With the max size of either dimension being 1000px
      withoutEnlargement: true // Don't change dimensions if already smaller
    }) // Resize to 1000x1000
    .trim() // Trim the white border
    .jpeg({ quality: 90 }) // Format as a JPEG with quality 90
    .toFile('./public/output.png', (err, info) => { err&&console.log(err); info&&console.log(info) })
    // .then(info => { console.log("info", typeof info) })
    // .catch(err => { console.log(err)});
}

route.post(async (req, res) => {
  const form = new formidable.IncomingForm();
  // await example1(req);
  form.parse(req, async function (err, fields, files) {
    const data = fs.readFileSync(files.coverImage.path);
    await resize(data)
    return res.status(201).send("Uploaded");
  });
})

export default route













// // -- -- -- -- -- -- -- -- -- -- -- 
// import formidable from 'formidable';
// import nc from 'next-connect';
// import fs from 'fs';

// const route = nc()

// export const config = {
//   api: {
//     bodyParser: false
//   }
// };

// const saveFile = async (file) => {
//   const data = fs.readFileSync(file.path);
//   fs.writeFileSync(`./public/${Date.now()+file.name}`, data);
//   await fs.unlinkSync(file.path);
//   return;
// };

// route.post(async (req, res) => {
//   const form = new formidable.IncomingForm();
//   form.parse(req, async function (err, fields, files) {
//     // await saveFile(files.coverImage);
//     console.log(files.coverImage.height)
//     return res.status(201).send("Uploaded");
//   });
// })

// export default route