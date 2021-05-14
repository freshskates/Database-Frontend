const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const handlebars = require("express-handlebars");
const indexRouter = require("./controllers/routes/index");
const apiRouter = require("./controllers/routes/api");
const expressip = require("express-ip");
const cors = require("cors");
const app = express();

app.engine(
  "hbs",
  handlebars({
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/layouts/partials"),
    extname: ".hbs",
    defaultLayout: "home",
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(expressip().getIpInfoMiddleware);
app.use(cors());
app.set("view engine", "hbs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));
app.use("/api", apiRouter);
app.use("/", indexRouter);

module.exports = app;
