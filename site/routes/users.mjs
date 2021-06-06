import Route from "./Route.mjs";
const route = new Route();
route.addGet("/",(
    req,
    res
)=> {
  res.send('respond with a resource');
})
export default route;