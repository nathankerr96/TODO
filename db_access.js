const mysql = require('mysql');


exports.handle_request = function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'})


  var config = {
    host: "localhost",
    user: "test",
    database: "todo",
  }

  /*
  config.authSwitchHandler = (unused, cb) => {
    // workaround for node mysql bug #1507
    if (pluginName === 'auth_socket') {
      cb(null, Buffer.alloc(0));
    } else {
      cb(new Error("Unsupported auth plugin"));
    }
  };
  */

  console.log("HEREtest")

  var con = mysql.createConnection(config);

  con.connect(function(err) {
    if (err) {
      throw err;
    } else {
      alert("Connected!");
    }
  })

  //res.write(JSON.stringify({a: 1, b: 2}));
  res.end();
}
