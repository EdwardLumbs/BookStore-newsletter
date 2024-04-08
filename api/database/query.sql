CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author TEXT NOT NULL,
    year VARCHAR(255) NOT NULL,
    genre VARCHAR(20) NOT NULL
)

CREATE TABLE email (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE
)

-- add books
INSERT INTO books (title, author, year, genre)
VALUES ($1, $2, $3, $4)

-- get books
SELECT * 
FROM books

-- get book
SELECT * 
FROM books
WHERE id = id

-- delete book
DELETE FROM books
WHERE id = id

-- add email
INSERT INTO email (email)
VALUES ($1)