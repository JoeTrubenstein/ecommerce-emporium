var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var cartRouter = require("./routes/cart");
var adminRouter = require("./routes/admin/admin");

var expressValidator = require("express-validator");
var session = require("express-session");
var flash = require("connect-flash");
var passport = require("passport"); 

var methodOverride = require("method-override");

var MongoStore = require("connect-mongo")(session);

var cartMiddleware = require('./utils/cartMiddleware')


var mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);

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

app.use(methodOverride("_method"));



app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      autoReconnect: true
    }),
    cookie: {
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000
    }
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

require("./lib/passport/passport")(passport);

// locals comes from node
app.use(function(req, res, next) {
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");

  next();
});

app.use(cartMiddleware)

app.use(
  expressValidator({
    errorFormatter: function(param, message, value) {
      var namespace = param.split(".");
      var root = namespace.shift();
      var formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }

      return {
        param: formParam,
        message: message,
        value: value
      };
    }
  })
);

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/admin", adminRouter);
app.use("/api/cart", cartRouter);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, function(
  err
) {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log("mongodb connected");
  }
});

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
