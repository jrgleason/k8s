import createError from "http-errors";
import morganBody from 'morgan-body';
import express from 'express';
import bodyParser from 'body-parser';
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import indexRouter from "./routes/index.mjs";
import usersRouter from "./routes/users.mjs";
import mongoRouter from "./routes/mongo.mjs";
const app = express();
app.use(bodyParser.json());
// morganBody(app);
const __dirname = dirname(fileURLToPath(import.meta.url));
const __public = path.join(__dirname, 'public');
const __views = path.join(__dirname, 'views');

// view engine setup
app.set('views', __views);
app.set('view engine', 'pug');
logger.token('test', (req, res) => `The Body is ${res.body}`)
app.use(logger(':method :url :status :response-time ms - :res[content-length] :test'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__public));

app.use('/', indexRouter.router);
app.use('/users', usersRouter.router);
app.use('/mongo', mongoRouter.router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const handleError = function(
    err,
    req,
    res
){
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}

// error handler
app.use(handleError);
export default app;
