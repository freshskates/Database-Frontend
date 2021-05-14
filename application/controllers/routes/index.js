const express = require("express");
const router = express.Router();
const Engine = require("../../models/Engine");

router.get("/", async (req, res, next) => {
  let data = await Engine.querySelect(0);
  res.render("index", { data, unique: "Library", render_js_files: ["Render"] });
});

router.get("*", async (req, res, next) => {
  let data = await Engine.querySelect(0);
  res.render("error", { data, unique: "Error 404", render_css_files: ["error"] });
});

module.exports = router;
