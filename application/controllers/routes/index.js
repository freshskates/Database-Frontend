const express = require("express");
const router = express.Router();
// const mytools = require("../helpers/mytools");
const Engine = require("../../models/Engine");
const debugPrinter = require("../helpers/debug/debug_printer");

router.get("/getAllBooks", async (req, res, next) => {
  let data = await Engine.getAllBooks();
  res.render("allBooks", { data });
});

router.get("/querySelect/:id(\\d)", async (req, res, next) => {
  let { query } = req.body;
  query = "Animal Farm";
  let data = await Engine.querySelect(req.params.id);
  debugPrinter.printSuccess(JSON.stringify(data));
  res.render("query1", { data });
});

router.get("/", async (req, res, next) => {
  let data = await Engine.querySelect(0);
  res.render("index", {data});
});
module.exports = router;
