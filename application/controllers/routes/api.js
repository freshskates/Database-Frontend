const express = require("express");
const router = express.Router();
const Engine = require("../../models/Engine");

router.get("/querySelect/:id(\\d)", async (req, res) => {
  const data = await Engine.querySelect(req.params.id);
  res.send(data);
});

module.exports = router;
