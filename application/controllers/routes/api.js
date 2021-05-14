const express = require("express");
const router = express.Router();
const Engine = require("../../models/Engine");

router.get("/querySelect/:id(\\d)/:query", async (req, res) => {
  const data = await Engine.querySelect(req.params.id, req.params.query === "null" ? null : req.params.query);
  res.send(data);
});

module.exports = router;
