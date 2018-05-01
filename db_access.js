const mysql = require('mysql');
const url = require('url');


exports.handle_request = function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'})


  var config = {
    host: 'localhost',
    user: 'test',
    database: 'todo',
    timezone: 'utc'
    }


  var parsedUrl = url.parse(req.url, true);

  var query = getQuery(parsedUrl);

  var con = mysql.createConnection(config);

  con.connect(function(err) {
    if (err) throw err;

    con.query(query, function (err, result, fields) {
      if (err) throw err;

      res.write(JSON.stringify(result), function (err) {
        res.end();
      });
    })

  })
}

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
      "', '" + task +"')";
  }

  if (mode === 'delete') {
    var user = searchParams.user;
    var insertTime = searchParams.insertTime;
    insertTime = insertTime.slice(0,19).replace('T', ' ');

    query = 'DELETE FROM ' + database + ' WHERE user="' + user +
      '" AND insertTime="' + insertTime + '";';

  }

  return query;
}
