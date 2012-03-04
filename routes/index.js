var module_race = require("../lib/modules/race");

exports.configure = function (app){
	app.get('/', function(req, res){
		res.render ('index.html', {title: 'Race'});
	});
}
