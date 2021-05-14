const db = require("../config/database");
const { getQuery } = require("./Queries");
const data = {
  normal: {
    4: true,
    5: true,
  },
};
const Engine = {};
Engine.queryStandalone = async base => {
  try {
    let [r, f] = await db.query(base);
    if (r && r.length) return r;
    else return null;
  } catch (err) {
    return null;
  }
};
Engine.queryDouble = async (base, query, check = false) => {
  try {
    console.log(`check: ${check}`);
    query = check ? query : `%${query}%`;
    let [r, f] = await db.query(base, [query]);
    if (r && r.length) return r;
    else return null;
  } catch (err) {
    return null;
  }
};

Engine.querySelect = async (id, query) => {
  const base = getQuery(id);
  if (!base) return null;
  if (query && query.length) return await Engine.queryDouble(base, query, id in data.normal ? true : false);
  else return await Engine.queryStandalone(base);
};

module.exports = Engine;
