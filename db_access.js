const mysql = require('mysql');
const url = require('url');


exports.handle_request = function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'})


  var config = {
    host: "localhost",
    user: "test",
    database: "todo",
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
  console.log(database);

  var searchParams = parsedUrl.query;
  var mode = searchParams.mode;

  if (mode === 'select' || mode === null) {
    return 'SELECT * FROM ' + database + ';';
  }

  if (mode === 'delete') {
    var id = searchParams.id;
    return 'DELETE FROM  ' + database + ' WHERE id=' + id + ';';
  }

  return null;
}
