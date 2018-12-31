INSERT INTO reading VALUES (null, 'nathan', NOW(), 'Test Book 1', 100, 10, 0);
INSERT INTO reading VALUES (null, 'nathan', NOW(), 'Test Book 2', 200, 20, 20);

INSERT INTO readingHistory VALUES (CONVERT_TZ(NOW(), @@session.time_zone, '+00:00'), 10, 1);
INSERT INTO readingHistory VALUES (CONVERT_TZ(NOW(), @@session.time_zone, '+00:00'), 10, 1);
INSERT INTO readingHistory VALUES (CONVERT_TZ(NOW() - INTERVAL 1 DAY, @@session.time_zone, '+00:00'), 25, 1);
INSERT INTO readingHistory VALUES (CONVERT_TZ(NOW() - INTERVAL 2 DAY, @@session.time_zone, '+00:00'), 15, 1);
INSERT INTO readingHistory VALUES (CONVERT_TZ(NOW(), @@session.time_zone, '+00:00'), 10, 2);
