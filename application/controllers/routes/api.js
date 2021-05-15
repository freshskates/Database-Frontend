const express = require("express");
const { route } = require(".");
const router = express.Router();
const Engine = require("../../models/Engine");
const System = require("../../controllers/helper/system");

router.get("/querySelect/:id(\\d)/:query", async (req, res) => {
  const data = await Engine.querySelect(req.params.id, req.params.query === "null" ? null : req.params.query);
  res.send(data);
});

router.post("/createBook", async (req, res) => {
  let { title, edition, genre, no_pages } = req.body;
  let isbn = System.generateISBN();
  let date_published = System.generateDate();
  let loc = req.ipInfo.country;
  let r = await Engine.createBook(isbn, title, edition, genre, date_published, loc, no_pages);
  res.redirect("/create");
});
router.post("/createAuthor", async (req, res) => {
  console.log("here");
  let { name, middle, last, nationality, DOB } = req.body;
  console.log(name);
  console.log(middle);
  console.log(last);
  console.log(nationality);
  console.log(DOB);
  let r = await Engine.createAuthor(name, middle, last, nationality, DOB);
  let error = true;
  let message = "Error Creating Author";
  if (r) {
    message = `Author ${name} ${middle} ${last} has been Created`;
    error = false;
  }
  res.render("create", { message, unique: "Upload", render_js_files: ["Render"], nav: true, error });
});

module.exports = router;
