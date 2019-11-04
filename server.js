


// const http = require('http'),
//   url = require('url');
//
// http.createServer((request, response) => {
//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   response.end('Hello Node!\n');
// }).listen(8080);
//
// console.log('My first Node test server is running on Port 8080.');
//
//

const http = require('http'),
  fs = require('fs'),
  url = require('url');

http.createServer((request, response) => {
  var addr = request.url,
    q = url.parse(addr, true),
    filePath = '';

  if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  }

  fs.readFile(filePath, function(err, data) {
    if (err) {
      throw err;
    }

  fs.appendFile('log.txt', new Date(), function(err){
    if (err){
      console.log(err);
    }

  })



    console.log(request.url);
    response.write('hi');
    response.end();

  });

}).listen(8080);
