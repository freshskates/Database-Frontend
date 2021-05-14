const db = require("../config/database");
const { getQuery } = require("./Queries");

const Engine = {};

Engine.querySelect = async id => {
  const base = getQuery(id);
  if (!base) return null;
  try {
    let [r, f] = await db.query(base);
    if (r && r.length) return r;
    else return null;
  } catch (err) {
    return null;
  }
};

module.exports = Engine;
