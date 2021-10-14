import multer from 'multer';
import nc from 'next-connect'

const route = nc()

//IN FACT WHAT I WANT TO ACHIEVE IS 
//.use(midl).get(endp).post(endp) . 
//I am used to this pattern. (express)


// //---- --- Attempt1  nc().use.get()
// const sub_top_6_cheap = nc()
//      .use((req, res, next) => {console.log("top-6-cheap route"); next()})
//      .get((req, res) => res.json({"top-6-cheap": req.method}))


// const sub_recommended = nc()
//      .use((req, res, next) => {console.log("recommended route"); next()})
//      .get((req, res) => res.json({"recommended": req.method}))


// route
//   .use("/top-6-cheap", sub_top_6_cheap)
//   .use("/recommended", sub_recommended)
//   .get((req, res) => {                 //! all reqs are caught here
//     res.send("main caught")
//   })






// //---- --- Attempt2  nc().use.get()
// const sub_top_6_cheap = nc()
//      .use((req, res, next) => {console.log("top-6-cheap route"); next()})
//      .get((req, res) => res.json({"top-6-cheap": req.method}))


// const sub_recommended = nc()
//      .use((req, res, next) => {console.log("recommended route"); next()})
//      .get((req, res) => res.json({"recommended": req.method}))


    
// route
//   .use("/:sub", sub_top_6_cheap)//! all reqs are caught here,
//   .use("/recommended", sub_recommended)
//   .get((req, res) => {
//     res.send("main caught")
//   })






// //---- --- Attempt3  nc().use.use()  !! note use() instead of get()/post()
// // Gives this error for each request 
// // even after return. (app does not crush)
// //
// //uncaughtException: Error [ERR_STREAM_WRITE_AFTER_END]: write after end
// //   at writeAfterEnd
const sub_top_6_cheap = nc()
   .use((req, res, next) => {console.log("top-6-cheap route"); next()})
   .use((req, res, next) => {
       // A get request to tours/top-6-cheap
       if(req.method !== 'GET' || req.query.subroute !== 'top-6-cheap') next()
       res.json({"top-6-cheap": req.method})
       return
    })
   .use((req, res, next) => {
       // A post request to tours/top-6-cheap
       if(req.method !== 'POST' || req.query.subroute !== 'top-6-cheap') next()
       res.json({"top-6-cheap": req.method})
       return
    })


const sub_recommended = nc()
   .use((req, res, next) => {console.log("recommended route"); next()})
   .use((req, res, next) => {
       // A get request to tours/recommended
       if(req.method !== 'GET' || req.query.subroute !== 'recommended') next()
       res.json({"recommended": req.method})
       return
    })
   .use((req, res, next) => {
       // A post request to tours/recommended
       if(req.method !== 'POST' || req.query.subroute !== 'recommended') next()
       res.json({"recommended": req.method})
       return
    })


route
  .use(sub_top_6_cheap)
  .use(sub_recommended)

  // subroutes didn't match. so it is :id
  .get((req, res) => {
    res.json({":id route": req.query.subroute, "method": req.method})
  })
  .post((req, res) => {
    res.json({":id route": req.query.subroute, "method": req.method})
  })

export default route

