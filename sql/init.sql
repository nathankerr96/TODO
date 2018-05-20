CREATE DATABASE IF NOT EXISTS todo;
USE todo;

DROP TABLE IF EXISTS tasks;
CREATE TABLE test_tasks (
  user VARCHAR(30) NOT NULL,
  insertTime DATETIME NOT NULL,
  task TEXT,
  complete BOOLEAN DEFAULT 0 NOT NULL,
  completeTime DATETIME,
  PRIMARY KEY (user, insertTime)
);
