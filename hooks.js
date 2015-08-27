var fs = require('fs')
	, path = require('path')
	, Q = require('q')
	, URI = require('URIjs')
	, from;

// Monkey-patch URIjs with uri templates
require('URIjs/src/URITemplate');

var URI_TEMPLATE = '/{env}/{name}/{uuid}';

function hooks() {
	from = path.join(__dirname, 'hooks');

	return Q.nfcall(fs.readdir, from).then(function(files) {
		return Q.all(files.map(function(file) {
			var filePath = path.join(from, file);

			return Q.nfcall(fs.stat, filePath)
				.then(function(stat) {
					return { path: filePath, isFile: stat.isFile() };
				});
		}))
		.then(function(descriptors) {
				var endpoints = [];

				descriptors.forEach(function(descriptor) {
					if (descriptor.isFile) {
						var hook = require(descriptor.path)
							, uri;

					  hook.endpoints.forEach(function(endpoint) {
						  uri = URI.expand(URI_TEMPLATE, {
							  env: endpoint.env,
							  name: hook.name,
							  uuid: endpoint.uuid
						  });

						  endpoints.push({ uri: uri.toString(), cmd: endpoint.cmd });
						});
					}
				});

				return endpoints;
		});
	});
}

module.exports = hooks;