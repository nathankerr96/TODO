INSERT INTO reading VALUES (null, 'nathan', NOW(), 'Test Book 1', 100, 10, 0);
INSERT INTO reading VALUES (null, 'nathan', NOW(), 'Test Book 2', 200, 20, 20);

INSERT INTO readingHistory VALUES (NOW() - INTERVAL 2 DAY, 30, 1);
INSERT INTO readingHistory VALUES (NOW(), 10, 1);
INSERT INTO readingHistory VALUES (NOW() - INTERVAL 1 DAY, 20, 1);
INSERT INTO readingHistory VALUES (NOW() - INTERVAL 1 DAY, 20, 2);
