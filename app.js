const createError = require("http-errors");
const express = require("express");
const cors = require("cors");

const logger = require("./lib/logger");
const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require("./constants/statusCode");

const indexRouter = require("./routes/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL, optionSuccessStatus:200 }));

app.use("/", indexRouter);

app.use((req, res, next) => {
  next(createError(NOT_FOUND));
});

app.use((err, req, res, next) => {
  logger.error(err.status, err.message, err.stack);

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || INTERNAL_SERVER_ERROR);
  res.json({status: err.status});
});

module.exports = app;
