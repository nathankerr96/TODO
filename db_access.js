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
    console.log(query);

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
  var user = mysql.escape(searchParams.user);
  //TODO: check insertTime integrity
  var insertTime = searchParams.insertTime;
  var task = mysql.escape(searchParams.task);

  var midnightDate = new Date();
  midnightDate.setHours(0,0,0,0);
  var midnightTime = midnightDate.toISOString().slice(0,19).replace('T', ' ');

  var query = null;

  if (mode === 'select' || mode === null) {
    query = 'SELECT * FROM ' + database +
      ' WHERE user=' + user +
        ' AND ((completeTime > "' + midnightTime + '" AND complete=1)' +
        ' OR complete=0)' +
      ';';
  }

  if (mode === 'insert') {
    query = "INSERT INTO " + database + " VALUES (" + user + ", '" + insertTime +
      "', " + task +", 0, NULL)";
  }

  if (mode === 'delete') {
    insertTime = insertTime.slice(0,19).replace('T', ' ');
    query = 'DELETE FROM ' + database + ' WHERE user=' + user +
      ' AND insertTime="' + insertTime + '";';
  }

  if (mode === 'markComplete') {
    insertTime = insertTime.slice(0,19).replace('T', ' ');
    query = 'UPDATE tasks SET complete=1, completeTime=NOW() WHERE user='+ user + ' AND insertTime="' +
        insertTime + '";';
  }

  return query;
}
