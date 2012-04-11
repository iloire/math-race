var config = require ('./config').values
var tty = require('tty');
var app = require ('./app').getApp(config)

process.stdin.resume();
tty.setRawMode(true);

var port = parseInt(process.argv[2], 10) || 3001
app.listen(port);

//create handler for socket.io
var race = require ('./lib/modules/race')
race.createRace(app);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


process.stdin.on('keypress', function(char, key) {
  if (key && key.ctrl && key.name == 'c') {
    app.close();
	console.log();
	console.log('Shutting down server..');
	process.exit(0);
  }
});