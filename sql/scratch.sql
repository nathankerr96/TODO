ALTER TABLE tasks ADD complete BOOLEAN DEFAULT 0 NOT NULL;

ALTER TABLE tasks ADD completeTime DATETIME;
