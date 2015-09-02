'use strict';

var express = require('express')
	, hooks = require('./hooks')
	, app = express();

function bootstrap(hooks) {
	var server;

	hooks.forEach(function(hook) {
		var uri = hook.uri
			, cmd = hook.cmd;

		app.post(uri, function(req, res) {
			console.log('app post %s with command %s', uri, cmd);
			res.status(200).send('OK').end();
		});
	});

	server = app.listen(8901, '0.0.0.0', function () {
		var host = server.address()
			, address = host.address
			, port = host.port;

		console.log('Hooker listening at http://%s:%s', address, port);
	});
}

hooks()
  .then(bootstrap)
  .done();
