const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const handlebars = require("express-handlebars");
const indexRouter = require("./controllers/routes/index");

const app = express();
app.engine(
  "hbs",
  handlebars({
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/layouts/partials"),
    extname: ".hbs",
    defaultLayout: "home",
    helpers: {
      equal: function (lvalue, rvalue, options) {
        if (arguments.length < 3) {
          console.log("ERROR");
          throw new Error("Handlebars Helper equal needs 2 parameters");
        }
        if (lvalue != rvalue) {
          return options.inverse(this);
        } else {
          return options.fn(this);
        }
      },
    },
  })
);

app.set("view engine", "hbs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));

// app.use((req, res, next) => {
//   next();
// });

app.use("/", indexRouter);

// app.use((err, req, res, next) => {
//   res.render("error", { err_message: err });
// });

module.exports = app;
