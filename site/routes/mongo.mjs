import mongo from "mongodb";
import Route from "./Route.mjs";

class MongoDb{
    constructor(
        username,
        password,
        server
    ) {
        if(username == null || password == null || server == null){
            console.error("You must provide MONGO_USER, MONGO_PASSWORD, and MONGO_SERVER");
        }
        this.client = new mongo.MongoClient(MongoDb.getUri());
    }
    static getUri(
        retryWrites = true,
        w="majority"
    ){
        return `mongodb+srv://${encodeURI(username)}:${encodeURI(password)}@${server}?retryWrites=${retryWrites}&w=${w}`;
    }

}

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const server = process.env.MONGO_SERVER;

const mgo = new MongoDb(username, password, server);

const route = new Route();
const DB = "poc";
const COLLECTION = "posts";

const recordAdded = ()=>{
    console.log("Record Added");
}
const getCollection = async ()=>{
    await mgo.client.connect();
    const db = mgo.client.db(DB);
    return db.collection(COLLECTION);
    collection.watch().on("change", recordAdded)
}

route.addGet("/", async (req, res)=>{
    const collection = await getCollection();
    collection.watch().on("change", recordAdded)
    const cursor = await collection.find().limit(100);
    const resultSet = [];
    await cursor.forEach(resultSet.push);
    res.json(resultSet);
});
route.addPost("/", async (req, res)=>{
    const collection = await getCollection();
    collection.createIndex( { "createdAt": 1 }, { expireAfterSeconds: 10 } )
    req.body["createdAt"] = new Date();
    await collection.insertOne(req.body);
    res.json(req.body);
});
route.addGet("/debug", (req, res)=>{
    res.json({
        password: process.env.MONGO_PASSWORD,
        username: process.env.MONGO_USERNAME,
        server: process.env.MONGO_SERVER
    });
})
getCollection().then((collection)=>{
    collection.watch().on("change", ()=>{
        console.logger("There was a change detected");
    });
})
export default route;