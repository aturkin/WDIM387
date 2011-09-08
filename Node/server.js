
require.paths.unshift(__dirname + '/../../lib/');

var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , sio = require('socket.io')
  , sys = require("sys")
  ,fs = require("fs")
  ,sqlite = require("./node-sqlite/sqlite");

fs.unlink('app.db');

//My objects

var users = new Array();
var manager;

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
app.set('view engine', 'ejs');

//app.get('/', function (req, res) {
//  res.render('index', { layout: false });
//});

app.get('/hello', function (req, res) {
	res.render("hello", {layout: false }); 
})

app.listen(3000, function () {
  var addr = app.address();
  
  //creat Manager
  manager = new Manager();
  console.log('   app listening on http://' + addr.address + ':' + addr.port);
});
var io = sio.listen(app);
var login = null;
var user;

io.sockets.on('connection', function (socket) {

	user = new User(socket);
	manager.findTable().addUser(user);
	users[users.length] = user;

	socket.on("validate", function(data) {	
		
	db.query("select * from user where user like '" + data.user + "' and password like '" + data.password + "'", function (records) {
		if (records.length = 1){
			user = new User(socket);
			manager.findTable().addUser(user);
			users[users.length] = user;
			
			//console.log(users[0].getSocket);	
		}
	});
});
	socket.on('my other event', function (data) {
	console.log(data);
	});
});

var User = function(_socket){
	
	
	var socket = _socket;
	
	socket.on("disconnect", function(){console.log("USER DC");});


	this.getSocket = function(){ return socket; }
}

var Manager = function(){

	this.tables = new Array();

	Manager.prototype.findTable = function(){
		
		//find a table / create table and return table
		if(this.tables.length > 1){
		
		}
		else{
			var table = new Table;
			this.tables[this.tables.length] = table;
			return table;
		}
	}

}



var Table = function(){

	this.players = new Array();		

	Table.prototype.tableAvil = function(){

		if(this.players.length > 1){
			return false;
		}

		return true;
	}
		
	Table.prototype.addUser = function(User) {
		this.players[this.players.length] = User;
		
		console.log(this.players.length);

		if (this.players.length > 1){
			console.log("Start Table");
		}
		else{
			console.log("Wait for players");
		}
	}
						
		
}

