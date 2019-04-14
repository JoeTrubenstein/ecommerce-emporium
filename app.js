var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var expressValidator = require("express-validator");
var session = require("express-session");
var flash = require("connect-flash");
var passport = require("passport")

var MongoStore = require("connect-mongo")(session);

var mongoose = require("mongoose");

require("dotenv").config();
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({url: process.env.MONGODB_URI, autoReconnect: true}),
  cookie: {
    secure: false,
    maxAge: 365 * 24 * 60 * 60 * 1000
  }
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session())

require('./lib/passport/passport')(passport)

app.use(expressValidator({
  errorFormatter: function(param, message, value) {

      var namespace = param.split('.');
      var root = namespace.shift();
      var formParam = root;

      while (namespace.length) {
          formParam += '[' + namespace.shift() + ']';
      }

      return {
          param: formParam,
          message: message,
          value: value
      }
  }
}))

app.use("/", indexRouter);
app.use("/api/users", usersRouter);

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true },
  function(err) {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      console.log("mongodb connected");
    }
  }
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


module.exports = app;
