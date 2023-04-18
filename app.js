const express = require('express');
const morgan = require('morgan');
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json());

app.use("/",(req,res,next)=>{
    res.send("Hello World");
    next();
    });

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;