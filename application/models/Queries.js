const Builder = {};

Builder.getAll = `SELECT * FROM project.book;`;

Builder.query1 = `SELECT 
checked_out.title,
checked_out.author_name,
stock.total_stock,
checked_out.checked_out,
(total_stock - checked_out) AS in_stock
FROM
(SELECT 
    book.title,
        CONCAT(author.author_first_name, ' ', CONCAT(author.author_middle_name, ' '), author.author_last_name) AS author_name,
        COUNT(*) AS checked_out
FROM
    checks_out
INNER JOIN book ON book.book_id = checks_out.book_id
INNER JOIN authored ON book.book_id = authored.book_id
INNER JOIN author ON authored.author_id = author.author_id
GROUP BY book.title , author_name) AS checked_out
    INNER JOIN
(SELECT 
    book.title,
        CONCAT(author.author_first_name, ' ', CONCAT(author.author_middle_name, ' '), author.author_last_name) AS author_name,
        COUNT(*) AS total_stock
FROM
    book
INNER JOIN authored ON authored.book_id = book.book_id
INNER JOIN author ON author.author_id = authored.author_id
GROUP BY book.title , author_name) AS stock ON checked_out.title = stock.title
    AND checked_out.author_name = checked_out.author_name
HAVING checked_out.title LIKE ?;`;

Builder.query2 = `SELECT
    book.title AS title, 
    CONCAT(author.author_first_name, " ", CONCAT(author.author_middle_name, " "), author.author_last_name) AS author_name,
    book.edition AS edition,
    book.genre AS genre,
    MAX(no_renewals) AS highest_renewals
FROM
    checks_out
INNER JOIN book ON checks_out.book_id = book.book_id
INNER JOIN authored ON authored.book_id = book.book_id
INNER JOIN author ON authored.author_id = author.author_id
GROUP BY title, author_name, edition, genre ORDER BY highest_renewals DESC;`;

Builder.query3 = `SELECT ALL 
member_id,
CONCAT(member_first_name, " ", member_middle_name, " ", member_last_name) AS fullname,
 member_phone_number, member_address
FROM 
member
WHERE member_id IN (SELECT 
member_id
                FROM checks_out);`;

Builder.query4 = `SELECT 
checked_out.title,
checked_out.author_name,
stock.total_stock,
checked_out.checked_out,
(total_stock - checked_out) AS in_stock
FROM
(SELECT 
    book.title,
        CONCAT(author.author_first_name, ' ', CONCAT(author.author_middle_name, ' '), author.author_last_name) AS author_name,
        COUNT(*) AS checked_out
FROM
    checks_out
INNER JOIN book ON book.book_id = checks_out.book_id
INNER JOIN authored ON book.book_id = authored.book_id
INNER JOIN author ON authored.author_id = author.author_id
GROUP BY book.title , author_name) AS checked_out
    INNER JOIN
(SELECT 
    book.title,
        CONCAT(author.author_first_name, ' ', CONCAT(author.author_middle_name, ' '), author.author_last_name) AS author_name,
        COUNT(*) AS total_stock
FROM
    book
INNER JOIN authored ON authored.book_id = book.book_id
INNER JOIN author ON author.author_id = authored.author_id
GROUP BY book.title , author_name) AS stock ON checked_out.title = stock.title
    AND checked_out.author_name = checked_out.author_name`;

Builder.query5 = `SELECT b.*
FROM project.book AS b
WHERE NOT b.book_id = ANY
  (SELECT co.book_id
  FROM project.checks_out AS co) and genre=?`;
Builder.query6 = `SELECT * FROM author;`;
const Factory = { 0: Builder.getAll, 1: Builder.query1, 2: Builder.query2, 3: Builder.query3, 4: Builder.query4, 5: Builder.query5, 6: Builder.query6 };

const getQuery = number => {
  if (number > Factory.length) return null;
  return Factory[number];
};

module.exports = { getQuery };
