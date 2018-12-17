CREATE DATABASE IF NOT EXISTS todo;
USE todo;

DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks (
  user VARCHAR(30) NOT NULL,
  insertTime DATETIME NOT NULL,
  task TEXT,
  complete BOOLEAN DEFAULT 0 NOT NULL,
  completeTime DATETIME,
  PRIMARY KEY (user, insertTime)
);

DROP TABLE IF EXISTS readingHistory;
DROP TABLE IF EXISTS reading;
CREATE TABLE reading (
  bookId MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(30) NOT NULL,
  insertTime DATETIME NOT NULL,
  title TEXT,
  pages INT,
  daily_goal INT,
  current_page INT
);

DROP TABLE IF EXISTS readingHistory;
CREATE TABLE readingHistory (
  day DATE,
  pagesRead INT,
  bookId MEDIUMINT,
  PRIMARY KEY (day, bookId),
  CONSTRAINT `fk_book_id`
    FOREIGN KEY (bookId) REFERENCES reading (bookId)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);
