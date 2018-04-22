const mysql = require('mysql');


exports.handle_request = function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'})


  var config = {
    host: "localhost",
    user: "test",
    database: "todo",
  }

  console.log("HEREtest")

  var con = mysql.createConnection(config);

  con.connect(function(err) {
    if (err) throw err;

    var q = 'SELECT * FROM tasks;';
    con.query(q, function (err, result, fields) {
      if (err) throw err;

      res.write(JSON.stringify({result}));
    })


  })

  //res.write(JSON.stringify({a: 1, b: 2}));
  res.end();
}
