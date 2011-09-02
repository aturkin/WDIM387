
require.paths.unshift(__dirname + '/../../lib/');

var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , sio = require('socket.io')
  , sys = require("sys")
  ,fs = require("fs")
  ,sqlite = require("./node-sqlite/sqlite")
  ,jade = require("jade");

fs.unlink('app.db');

var db = sqlite.openDatabaseSync("app");


var app = express.createServer();

app.configure(function () {
  app.use(express.static(__dirname + '/public'));


  function compile (str, path) {
    return stylus(str)
      .set('filename', path)
      .use(nib());
  };
});

//app.register('.html', require('jade'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index', { layout: false });
});

app.get('/hello', function (req, res) {
	res.render("hello", {layout: false }); 
})

app.listen(3000, function () {
  var addr = app.address();
  console.log('   app listening on http://' + addr.address + ':' + addr.port);
});
var io = sio.listen(app);
var login = null;

io.sockets.on('connection', function (socket) {

	socket.on("validate", function(data) {	
		
	db.query("select * from user where user like '" + data.user + "' and password like '" + data.password + "'", function (records) {
		if (records.length = 1){
		
;

		
		}
		console.log(records.length)
		//console.log(JSON.stringify(rows).length);
	});
		//console.log(data);
});


	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
	console.log(data);
	});
});
