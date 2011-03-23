var http = require('http')
  , url = require('url')
  , fs = require('fs')
  , io = require('../Socket.IO-node')
  , sys = require(process.binding('natives').util ? 'util' : 'sys')
  , server;
    
server = http.createServer(function(req, res){
  var path = url.parse(req.url).pathname;
  switch (path){
    case '/':
      res.writeHead(301, {'Location': '/chat.html'});
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

var io = io.listen(server)
  , buffer = [];

var hostdata = {}

var request_handler = function(request, response) {
  var buffer = '';
  request.addListener("data", function(chunk) {
    buffer += chunk;
  });
/*  request.addListener("end", function() {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("OK");
    response.end();
    console.log(buffer.toString())
    //io.broadcast(buffer.toString())
  }); */
  request.addListener("end", function() {
    data = eval(buffer);
    for (var i = 0; i < data.length; i++) {
      record = data[i];
      hostname = record['host'];
      plugin = record['plugin'];
      if (hostdata[hostname] == undefined) hostdata[hostname] = {};
      if (hostdata[hostname][plugin] == undefined) hostdata[hostname][plugin] = [];
      hostdata[hostname][plugin].push(record['values']);
      io.broadcast(hostdata.toString());
      console.log(JSON.stringify(hostdata));
    }
  })
}
  
io.on('connection', function(client){
  client.on('message', function(message){
    var msg = { message: [client.sessionId, message] };
    client.broadcast(msg);
  });
});
