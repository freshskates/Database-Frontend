const Script = {};

Script.getAll = `SELECT * FROM project.book;`

Script.query1 = 
`SELECT 
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
HAVING checked_out.title LIKE '%Animal Farm%';`

Script.query2 = 
`SELECT
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
GROUP BY title, author_name, edition, genre ORDER BY highest_renewals DESC;`

Script.query3 = 
`SELECT ALL 
member_id,
CONCAT(member_first_name, " ", member_middle_name, " ", member_last_name) AS fullname,
 member_phone_number, member_address
FROM 
member
WHERE member_id IN (SELECT 
member_id
                FROM checks_out);`

Script.query4 = 
`SELECT *
FROM project.book AS b
WHERE NOT EXISTS
  (SELECT *
  FROM project.checks_out AS co
  WHERE co.book_id = b.book_id)`

Script.query5 = 
`SELECT b.*
FROM project.book AS b
WHERE b.book_id <> ANY
  (SELECT co.book_id
  FROM project.checks_out AS co)`

const Queries = {0: Script.getAll, 1: Script.query1, 2: Script.query2, 3: Script.query3, 4: Script.query4, 5: Script.query5 }

const getQuery = (number) => {
    if(number > Queries.length) return null 
    return Queries[number]
}

module.exports = {getQuery};
