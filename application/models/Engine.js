const db = require("../config/database");
const {getQuery} = require("./Queries")
const debugPrinter = require("../controllers/helpers/debug/debug_printer");

const Engine = {};

Engine.querySelect = async (number) => {
  let base = getQuery(number);
  if(!base) return null;
  try {
    let [r, f] = await db.query(base);
    if (r && r.length) return r;
    else return null;
  } catch (err) {
    return null;
  }
};
module.exports = Engine;
