const express = require("express");
const router = express.Router();
// const mytools = require("../helpers/mytools");
const Engine = require("../../models/Engine");
const debugPrinter = require("../helpers/debug/debug_printer");

router.get("/getAllBooks", async (req, res, next) => {
  let data = await Engine.getAllBooks();
  res.render("allBooks", { data });
});

router.get("/query1", async (req, res, next) => {
  let { query } = req.body;
  query = "Animal Farm";
  let data = await Engine.Query1(query);
  debugPrinter.printSuccess(JSON.stringify(data));
  res.render("query1", { data });
});

router.get("/", async (req, res, next) => {
  let data = await Engine.getAllBooks();
  res.render("index", { data });
});
module.exports = router;
