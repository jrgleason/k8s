#!/usr/bin/env node

import winston from "winston";
import fs from "fs";
import http from "http";

import app from "../app.mjs";
import expressWinston from "express-winston";
const dirname = process.env.LOG_DIR || '/var/external';
const portNumber = process.env.PORT || '3000';

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'error.log',
    level: 'error',
    dirname: dirname
  }),
  new winston.transports.File({
    filename: 'combined.log',
    dirname: dirname
  }),
]
global.logger = winston.createLogger({
  level: 'silly',
  format: winston.format.json(),
  defaultMeta: {
    service: 'express-app'
  },
  transports
});

const run = function(){
  // checkLogDirectory().then(()=>{
    // Start App
    const server = new Runner();
    server.startServer();
  // }, (error)=>{
  //   global.logger.error(`Could not resolve the logging directory please ensure it is mounted ${dirname} \n ${error}`)
  // })
}
const checkLogDirectory = function(){
  return new Promise((res, rej)=>{
    fs.access(dirname, (error)=>{
      if(error) rej(error)
      else res()
    });
  })
}

class Runner{
  constructor() {
    this.app = app;
    this.port = this.normalizePort(portNumber);
    this.app.set('port', this.port);
    // this.app.use(
    //     expressWinston.logger(
    //         {
    //           transports,
    //           msg: "HTTP {{req.method}} {{req.url}}"
    //         }
    //     )
    // )
    // this.app.use(morgan('combined'));
    /**
     * Create HTTP server.
     */
    this.server = http.createServer(this.app);
    this.server.on('error', this.onError.bind(this));
    this.server.on('listening', this.onListening.bind(this));


  }
  startServer(){
    this.server.listen(this.port);
  }
  onError(msg){
    global.logger.error(msg);
  }
  onListening(){
    global.logger.info(`Server Started on port ${this.port}`);
  }
  normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
  }
}

// Run the app
run();