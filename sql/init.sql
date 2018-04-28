CREATE DATABASE IF NOT EXISTS todo;
USE todo;

DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks (
  user VARCHAR(30) NOT NULL,
  insertTime DATETIME NOT NULL,
  task TEXT,
  PRIMARY KEY (user, insertTime)
);
