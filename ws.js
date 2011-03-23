var http = require('http')
  , url = require('url')
  , fs = require('fs')
  , io = require('../Socket.IO-node')
  , sys = require(process.binding('natives').util ? 'util' : 'sys')
  , server;


    
server = http.createServer(function(req, res){
  // your normal server code
  var path = url.parse(req.url).pathname;
  switch (path){
    case '/':
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<h1>Welcome. Try the <a href="/chat.html">chat</a> example.</h1>');
      res.end();
      break;
      
    case '/json.js':
    case '/jquery.js':
    case '/jquery.flot.js':
    case '/chat.html':
      fs.readFile(__dirname + path, function(err, data){
        if (err) return send404(res);
        res.writeHead(200, {'Content-Type': path == 'json.js' ? 'text/javascript' : 'text/html'})
        res.write(data, 'utf8');
        res.end();
      });
      break;
    case '/post-collectd':
      request_handler(req, res);
      break;
    default: send404(res);
  }
}),

send404 = function(res){
  res.writeHead(404);
  res.write('404');
  res.end();
};

server.listen(8080);

// socket.io, I choose you
// simplest chat application evar
var io = io.listen(server)
  , buffer = [];

/*
var request_handler = function(request, response) {
  var putval_re = /^PUTVAL ([^ ]+)(?: ([^ ]+=[^ ]+)?) ([0-9]+)(:(?:-?[0-9.]+)+)/;
  request.addListener("data", function(chunk) {
    metrics = chunk.toString().split("\n")
    for (var i in metrics) {
      var m = putval_re.exec(metrics[i]);
      if (!m) {
        continue;
      }
      var name = m[1];
      var options = m[2];
      var time = m[3];
      var value = m[4].replace(/:/, "");

      name = "collectd." + name.replace(/\./g, "_").replace(/\//g, ".");
      message = [name, value, time].join(" ")
      console.log(message)
      io.broadcast(message)
    }
  });

  request.addListener("end", function() {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("OK");
    response.end();
  });
}
*/
var request_handler = function(request, response) {
  var buffer = '';
  request.addListener("data", function(chunk) {
    buffer += chunk;
  });
  request.addListener("end", function() {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("OK");
    response.end();
      console.log(buffer.toString())
      io.broadcast(buffer.toString())
  });
}
  
io.on('connection', function(client){
  client.on('message', function(message){
    var msg = { message: [client.sessionId, message] };
    buffer.push(msg);
    if (buffer.length > 15) buffer.shift();
    client.broadcast(msg);
  });
});
