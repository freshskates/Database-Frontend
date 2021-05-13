const db = require("../config/database");
const debugPrinter = require("../controllers/helpers/debug/debug_printer");

const Engine = {};

Engine.getAllBooks = async _ => {
  debugPrinter.printFunction("Engine.getAll");
  let baseSQL = "SELECT * FROM project.book;";
  let [r, fields] = await db.query(baseSQL);
  return r;
};

Engine.Query1 = async query => {
  let base =
    "SELECT checked_out.title, " +
    "checked_out.author_name, " +
    "stock.total_stock, " +
    "checked_out.checked_out, " +
    "(total_stock - checked_out) AS in_stock " +
    "FROM ( " +
    "SELECT book.title, " +
    "CONCAT(author.author_first_name, ' ', CONCAT(author.author_middle_name, ' '), author.author_last_name) as author_name, " +
    "COUNT(*) AS checked_out " +
    "FROM checks_out " +
    "INNER JOIN book ON book.book_id = checks_out.book_id " +
    "INNER JOIN authored ON book.book_id = authored.book_id " +
    "INNER JOIN author ON authored.author_id = author.author_id " +
    "GROUP BY book.title, author_name " +
    ") AS checked_out " +
    "INNER JOIN " +
    "(SELECT book.title, " +
    "CONCAT(author.author_first_name, ' ', CONCAT(author.author_middle_name, ' '), author.author_last_name) as author_name, " +
    "COUNT(*) as total_stock " +
    "FROM book INNER JOIN authored ON authored.book_id = book.book_id " +
    "INNER JOIN author ON author.author_id = authored.author_id ";
  "GROUP BY book.title, author_name " +
    ") as stock ON checked_out.title = stock.title AND checked_out.author_name = checked_out.author_name " +
    "HAVING checked_out.title LIKE %Animal Farm%;";
  try {
    let [r, f] = await db.query(base);
    if (r && r.length) return r;
    else return r;
  } catch (err) {
    return null;
  }
};
module.exports = Engine;
