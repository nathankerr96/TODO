const http = require('http');
const url = require('url');
const fs = require('fs');

const db = require('./db_access.js')


function route(req, res) {

    var parsed_url = url.parse(req.url, true);
    var filename = "." + parsed_url.pathname;

    if (parsed_url.pathname.substring(0,4) === '/api') {
      db.handle_request(req, res);
    } else {
      fs.readFile(filename, function(err, data) {
          if (err) {
              res.writeHead(404, {'Content-Type': 'text/html'});
              console.log(filename);
              return res.end("404 Not Found");
          }

          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          return res.end();
      });
    }
}

http.createServer(route).listen(8080);
