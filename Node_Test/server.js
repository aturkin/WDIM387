// The port the server will use.
// Set this to usable port number to run the example.
var port = 8080;
require.paths.unshift(__dirname + "/client");
var http = require('http'),
	sys = require('sys'),
	nodeStatic = require('node-static/lib/node-static'),
	assert = require('assert'),
	io = require('socket.io');

var server = http.createServer(function (req, res) {
	var file = new nodeStatic.Server('./public',{
		cache: false
	});
	
	req.addListener('end', function() {
		file.serve(req, res);
	});
	
});
server.listen(port);

// socket.io, I choose you
var socket = new io.listen(server);

var Sock = socket.on('connection', function(client.ip){
  
  // new client is here!
  console.log('Connection');


  client.send('news', { hello: 'world' });
  //client.send('hello', { hello: 'world2' });

 
  client.on('message', function(data){ 
	
	//console.log(data);
  })


//Sock.send('hello');

  client.on('disconnect', function(){
	console.log('disconnection' );
  })
  
});

console.log('Server running at http://173.230.154.161:'+port+'/');


