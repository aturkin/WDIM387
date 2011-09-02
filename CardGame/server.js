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
var players = 0;
var game = new Deck();

//Sock.send('hello');

var Sock = socket.on('connection', function(client){
  // new client is here!
  players +=1;
  console.log('Total Players...' + players );
	client.send("<center><H1><font color='blue'>You are player "  + players + "</H1></font></center></br>");
  client.send(players);
  client.send(game.Cpop(players).Cdiv);
  
  if (players == 2)
  {
	socket.broadcast(game.gameLogic());
  }

  client.on('message', function(data){ 
	
	console.log(data);
  })

  client.on('disconnect', function(){
	players +=-1
	console.log('disconnect: Total Players...' + players );
  })
  
});

console.log('Server running at http://173.230.154.161:'+port+'/');

function Deck() {

	var deck = new Array();
	
	var P1;
	var P2;
	
	shuffle();
	deck.sort(function() {return 0.5 - Math.random()});
	
	this.Cpop = function(player){
	
	
		if (player ==1)
		{
			P1 = deck.pop();
			return P1;
		}
		else
		{
			P2 = deck.pop();
			return P2;
		}
	}
	this.gameLogic = function(){
	
		console.log("GameLogic: " + P1.Rank);
		
		if (P1.Rank > P2.Rank)
		{
			console.log("P1 Won");
			return "<center><H1><font color='green'>Player 1 Won wtih " + P1.Cvalue +"</H1></font></center></br>";
		}
		if (P2.Rank > P1.Rank)
		{
			console.log("P2 Won");
			return "<center><H1><font color='green'>Player 2 Won wtih " + P2.Cvalue +"</H1></font></center></br>";
		}
		else
		{
			console.log("Tie");
			return "<center><H1><font color='green'>Tie</H1></font></center></br>";
		}
	
	
	}

	function shuffle(){
		
		var x, suit, value;
		
		for(i=1; i<=13; i++ ) {
			switch (i) {
				case 1:
					value= "a";
					break;
				case 13:
					value="k";
					break;
				case 12:
					value="q";
					break;
				case 11:
					value="j";
					break;
				default:
					value = i
			}
		
			for(y=0; y<=3; y++ ) {
			
				switch (y) {
					case 0:
						suit="d";
						break;
					case 1:
						suit="h";
						break;
					case 2:
						suit="c";
						break;
					case 3:
						suit="s";
						break;
					default:
						suit = ""
				}
			
				deck.push(new Card(value, suit)); 
				//console.log(value + suit);
				x++;
			}
		}
	}

};


function Card(value, suit) {

	//console.log(value + suit);
  var Value = value;
  var Suit = suit;
  var rank;
 
  this.Cvalue = printC();
  this.Cdiv = createDiv();
  this.Rank = getRank();

	function printC() {

		  var value, suit;
		  switch (Value) {

			case 2:
			  value= "Two";
			  rank = 1;
			  break;
			case 3:
			  value= "Three";
			  rank = 2;
			  break;
			case 4:
			  value= "Four";
			  rank = 3;
			  break;
			case 5:
			  value= "Five";
			  rank = 4;
			  break;
			case 6:
			  value= "Six";
			  rank = 5;
			  break;
			case 7:
			  value= "Seven";
			  rank = 6;
			  break;
			case 8:
			  value= "Eight";
			  rank = 7;
			  break;
			case 9:
			  value= "Nine";
			  rank = 8;
			  break;
			case 10:
			  value= "Ten";
			  rank = 9;
			  break;
			case "j":
			  value= "Jack";
			  rank = 10;
			  break;
			case "q":
			  value= "Queen";
			  rank = 11;
			  break;
			case "k":
			  value = "King";
			  rank = 12;
			  break;
			case "q":
			  value= "Ace";
			  rank = 13;
			  break;
			default:
			  value= "";
			  break;
		  }

		  switch (Suit) {
			case "d":
			  suit = "Diamonds"
			  break;
			case "c":
			  suit = "Clubs";
			  break;
			case "h":
			  suit = "Hearts"
			  break;
			case "s":
			  suit = "Spades"
			  break;
			default:
			  suit = "";
			  break;
		  }
			
			//console.log(value + " of " + suit);
			
			return value + " of " + suit;
		}

		function getRank (){
			return rank;
		}
		function createDiv () {
			
			return "<div id='1' align='right' ><center><img src='/Images/DeckCards/" + Suit + Value +".png' alt='value'/></center></div>";
			
			}
	}
