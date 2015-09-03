'use strict';

var util = require('util')
	, ifaces = require('os').networkInterfaces()
	, express = require('express')
	, pkg = require('./package.json')
	, hooks = require('./hooks')
	, app = express()
  , address;

Object.keys(ifaces).forEach(function (ifname) {
	var count = 0;

	ifaces[ifname].forEach(function (iface) {
		if ('IPv4' === iface.family && !iface.internal) {
			address = iface.address;
			count = count + 1;
		}
	});
});

function bootstrap(hooks) {
	var server;

	hooks.forEach(function(hook) {
		var uri = hook.uri
			, cmd = hook.cmd;

		app.post(uri, function(req, res) {
			var response = util.format('app post %s with command %s on %s\n', uri, cmd, address);
			res.status(200).send(response).end();
		});
	});

	app.get('*', function(req, res, next) {
		var response = util.format('%s (%s) ~ %s\n', pkg.name, pkg.version, pkg.description);
		res.status(200).send(response).end();
		next();
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
