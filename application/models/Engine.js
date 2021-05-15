const db = require("../config/database");
const { getQuery } = require("./Queries");
const data = {
  normal: {
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

Engine.authorExists = async author => {
  try {
    let base = "SELECT * FROM author;";
    let result = await db.query(base);
    return result && result.length;
  } catch (err) {
    return false;
  }
};

Engine.createAuthor = async (name, middle, last, nationality, DOB) => {
  try {
    console.log("Creating a user");
    let base = "INSERT INTO author (`author_first_name`, `author_middle_name`, `author_last_name`, `nationality`, `author_dob`) VALUES (?,?,?,?,?)";
    let result = await db.query(base, [name, middle, last, nationality, DOB]);
    return result;
  } catch (err) {
    return null;
  }
};

Engine.createBook = async (isbn, title, edition, genre, date_published, loc, no_pages) => {
  try {
    let base = "INSERT INTO `project`.`book` (`isbn`, `title`, `edition`, `genre`, `date_published`, `loc_published`,`no_pages`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    return await db.query(base, [isbn, title, edition, genre, date_published, loc, no_pages]);
  } catch (err) {
    return null;
  }
};
module.exports = Engine;
