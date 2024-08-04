if(process.env.NODE_ENV!="production"){
  require('dotenv').config()

}
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const expressError = require("./utils/expressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const localStrategy=require("passport-local");
const User=require("./models/User.js");
const passport = require("passport");

const app = express();
const port = 8080;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, "/public")));


// All Routers

const listingsRouter = require("./routes/listings.js");
const reviewRouter= require("./routes/reviews.js");
const UsersRouter=require("./routes/users.js");
const filters=require("./routes/filter.js");
// mongoose connection

// const url = "mongodb://127.0.0.1:27017/Airbnb";
const db_url=process.env.ATLAS_URL;

main()
  .then(() => {
    console.log("connection succesful");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
async function main() {
  await mongoose.connect(db_url);
}

// Express session

const dbStore=MongoStore.create({
    mongoUrl: db_url,
    touchAfter: 24 * 3600,
    crypto:{
      secret:process.env.SECRET,
    }
  
  })


const sessionOption = {
  store:dbStore,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
};

app.use(session(sessionOption));
app.use(flash());

// passport Authenitication

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser=req.user;
  next();
})


// Routers connections

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/",UsersRouter);
app.use("/filters",filters);



// Catch-all route

app.all("*", (req, res, next) => {
  next(new expressError(404, "Page not found"));
})


// Error handling middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  res.status(statusCode).render("listing/error", { err });
});


// Start the server
app.listen(port, () => {
  console.log("server is connected ", port);
});
