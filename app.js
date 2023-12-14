var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var clientRouter = require("./routes/client");
var productRouter = require("./routes/product");
var brandRouter = require("./routes/brand");
var categoryRouter = require("./routes/category");

var app = express();

//handlebars equals
var hbs = require("hbs");
hbs.registerHelper("equal", require("handlebars-helper-equal"));

// 2. config 'mongoose' module
var mongoose = require("mongoose");
var uri =
  "mongodb+srv://truong203:truong2003@truong.utvrcjs.mongodb.net/Assigment"
mongoose
  .connect(uri)
  .then(() => console.log("ok"))
  .catch((err) => console.log(err));

// 3. config 'body-parser' module
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", clientRouter);
app.use("/product", productRouter);
app.use("/brand", brandRouter);
app.use("/category", categoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(process.env.PORT || 3001);

module.exports = app;
