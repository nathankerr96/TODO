const mysql = require('mysql');
const url = require('url');


var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'test',
    database: 'todo',
    timezone: 'utc'
});

exports.handle_request = function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});

  var parsedUrl = url.parse(req.url, true);

  var query = getQuery(parsedUrl);

  //var con = mysql.createConnection(config);

  pool.getConnection(function(err, con) {
    if (err) throw err;

    con.query(query, function (err, result, fields) {
      if (err) {
        console.log("Error on mysql connection.");
        throw err;
      }

      con.release();

      res.write(JSON.stringify(result), function (err) {
        res.end();
      });
    });

  });
};

function getQuery(parsedUrl) {

  var database = parsedUrl.pathname.split('/')[2];

  var searchParams = parsedUrl.query;
  var mode = searchParams.mode;

  var query = null;
  if (mode === 'select' || mode === null) {
    var user = searchParams.user;
    query = 'SELECT * FROM ' + database + ' WHERE user="' + user + '";';
  }

  if (mode === 'insert') {
    var user = searchParams.user;
    var insertTime = searchParams.insertTime;
    var task = searchParams.task;

    query = "INSERT INTO " + database + " VALUES ('" + user + "', '" + insertTime +
      "', '" + task +"', 0)";

  }

  if (mode === 'delete') {
    var user = searchParams.user;
    var insertTime = searchParams.insertTime;
    insertTime = insertTime.slice(0,19).replace('T', ' ');

    query = 'DELETE FROM ' + database + ' WHERE user="' + user +
      '" AND insertTime="' + insertTime + '";';

  }

  if (mode === 'markComplete') {
    var user = searchParams.user;
    var insertTime = searchParams.insertTime;
    insertTime = insertTime.slice(0,19).replace('T', ' ');

    query = 'UPDATE tasks SET complete = 1 WHERE user="'+ user + '" AND insertTime="' +
        insertTime + '";';

  }

  return query;
}
