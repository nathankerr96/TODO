var mysql = require('mysql');
var url = require('url');

var READING_TABLE_NAME = "reading";
var TASKS_TABLE_NAME = "tasks";


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
  console.log(query);
  if (query == null) {
    console.log("NULL query");
    return;
  }
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

//TODO; Change database to table
function getQuery(parsedUrl) {
  var database = parsedUrl.pathname.split('/')[2];
  if (database == TASKS_TABLE_NAME) {
    return getTodoQuery(parsedUrl);
  } else if (database == READING_TABLE_NAME) {
    return getReadingQuery(parsedUrl);
  } else {
    console.log("Could not identify table: " + database);
  }

}

function getReadingQuery(parsedUrl) {
    var searchParams = parsedUrl.query;
    var mode = searchParams.mode;
    var user = mysql.escape(searchParams.user);

    if (mode == "insert") {
      var insertTime = searchParams.insertTime;
      var title = searchParams.title;
    }
    var query;
    switch (mode) {
      case "select":
        query = "SELECT * FROM " + READING_TABLE_NAME +
          " WHERE user=" + user + ";";
        break;
      case "insert":
        //handle insert
        break;
      default:
        console.log("Unrecognized mode: " + mode);
        break;
    }
    return query;
}

function getTodoQuery(parsedUrl) {

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
    query = 'SELECT * FROM ' + TASKS_TABLE_NAME +
      ' WHERE user=' + user +
        ' AND ((completeTime > "' + midnightTime + '" AND complete=1)' +
        ' OR complete=0)' +
      ';';
  }

  if (mode === 'insert') {
    query = "INSERT INTO " + TASKS_TABLE_NAME + " VALUES (" + user + ", '" + insertTime +
      "', " + task +", 0, NULL)";
  }

  if (mode === 'delete') {
    insertTime = insertTime.slice(0,19).replace('T', ' ');
    query = 'DELETE FROM ' + TASKS_TABLE_NAME + ' WHERE user=' + user +
      ' AND insertTime="' + insertTime + '";';
  }

  if (mode === 'markComplete') {
    insertTime = insertTime.slice(0,19).replace('T', ' ');
    query = 'UPDATE ' + TASKS_TABLE_NAME + ' SET complete=1, completeTime=NOW() WHERE user='+ user + ' AND insertTime="' +
        insertTime + '";';
  }

  return query;
}
