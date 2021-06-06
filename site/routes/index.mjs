import Route from "./Route.mjs";
const type = process.env.DEPLOY_TYPE || 'Red';
const route = new Route();
route.addGet("/",(
    req,
    res
) => {
    res.render('index', {title: 'Express', type});
})
route.addPost("/", (req, res)=>{
    res.send("Worked");
})
export default route;

