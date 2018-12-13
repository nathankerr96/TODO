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

DROP TABLE IF EXISTS reading;
CREATE TABLE reading (
  user VARCHAR(30) NOT NULL,
  insertTime DATETIME NOT NULL,
  title TEXT,
  pages INT,
  daily_goal INT,
  current_page INT,
  PRIMARY KEY (user, insertTime)
);
