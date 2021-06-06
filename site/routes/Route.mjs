import express from "express";
const POST = "POST";
export default class Route{
    constructor(){
        this.router = express.Router();
    }
    addRequest(path, callback, type){
        if (typeof callback === 'function') {
            // do something
            switch (type){
                case POST:
                    this.router.post(path, callback);
                    break;
                default:
                    this.router.get(path, callback);
            }

        } else{
            console.error("Callback should be a function")
        }
    }
    addGet(path, callback){
        this.addRequest(
            path,
            callback
        );
    }
    addPost(path, callback){
        this.addRequest(
            path,
            callback,
            POST
        )
    }
}