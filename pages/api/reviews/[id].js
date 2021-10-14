import nc from "next-connect";

const mainRoute = nc({ attachParams: true });

// const subRoute1 = 

const subRoute2 = nc().use((req, res, next) => {
    console.log("subroute2 middleware");
    res.end("api/tours/stats");
  })

const subRoute3 = nc()
  .use((req, res, next) => {
    console.log("subroute3 middleware");
    next();
  })
  .get((req, res) => {
    res.end("api/tours/monthly-plan");
  });

let matchedRoute = {
  "active": ''
}

const matched = {

  "stats": nc().use((req, res, next) => {
                  console.log("subroute1 middleware");
                  next()
                }).get((req, res) => {
                  res.end("api/tours/stats");
                })
}

const subrouteController = (req, res, next) => {
  console.log("id: ", req.query.id)
  matchedRoute.active = matched[req.query.id]
  next()
}

mainRoute
  .use(subrouteController)
  .use((req, res, next) => {
    console.log("type "+ typeof matchedRoute.active)
    next()
  })

mainRoute
  .use(matched.stats)
  .get((req, res) => {
    res.end("api/tours");
  });

export default mainRoute;
