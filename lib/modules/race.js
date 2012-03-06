var config = require("../../config").values
var io = require('socket.io').listen(config.server.production.real_time_server.port);
var util = require("./util")

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Operation () {
	var self = this;
	var member1 = getRandomInt(0,20);
	var member2 = getRandomInt(0,20); 
	
	var operation_type = getRandomInt(0,1) ? '+' : '-'; //build the match challenge.
	self.quest =  member1 + operation_type + member2;
	self.solution = eval (self.quest);
}

function createRace(server){
	var socket = io.sockets;
	var clients = {} //id (int) : client (obj)
	var sessions = [] //array of client id's
	var scores = {}
	var history = [];

	function broadcast(sessions, command, data, exception){
		for (var i=0, l=sessions.length; i < l ; i++) {
			if (!exception || sessions[i] != exception)
				clients[sessions[i]].emit(command, data);
		};
	}

	var operation = new Operation();

	function format_scores (scores){
	   var arr = [];
	   for(var key in scores){
	      arr.push({player: key, score : scores[key]});
	   }
	   return arr;
	}

	var game_duration = config.game.duration * 1000;
	var game_started = new Date();

	setInterval(function broadcastTime(){
		var elapsed = new Date().getTime() - game_started.getTime();
		var remaining = Math.floor((game_duration - elapsed) / 1000);
		if (remaining<0){
			//archive game
			if (format_scores(scores).length){
				history.push({
					timestamp: game_started.getTime(), 
					name: game_started.getHours() + ":" + (game_started.getMinutes() > 9 ? game_started.getMinutes() : '0' + game_started.getMinutes()), 
					scores: format_scores(scores)
				});
				broadcast (sessions, 'history', history); //broadcast history
			}
			scores = {}; //reset
			game_started = new Date(); //start game again!
			broadcast (sessions, 'scores', format_scores(scores)); //reset scores in client
		}
		else{
			broadcast (sessions, 'time', remaining); //broacast scores
		}
	}, 1000);

	socket.on('connection', function (client) {

		client.on('join', function (data) {
			util.add (sessions, client.id); //add client id to list of sessions
			clients[client.id] = client;  //store specific client object
			client.emit ('new_operation', operation.quest); //send challenge to new client
			client.emit ('scores', format_scores(scores)); //broacast scores to new client
		});

		client.on('solve_operation', function (data) {
			if (data.operation == operation.solution){
				//result_operation: 1:you win, 2:other player won, 0: bad operation
				client.emit ('result_operation', 1); //msg to winner
				broadcast (sessions, 'result_operation', 2, client.id); //msg to rest of players. someone else won!

				scores[data.name] = (scores[data.name] || 0) + 1 //credit score to client
				broadcast (sessions, 'scores', format_scores(scores)); //broacast scores

				//new challenge
				operation =  new Operation();
				broadcast (sessions, 'new_operation', operation.quest); //new challenge for all players
			}
			else //baaaad. you need some math classes
				client.emit ('result_operation', 0);
		});
	});
}
exports.createRace = createRace;
