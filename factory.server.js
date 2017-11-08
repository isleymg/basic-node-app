module.exports = function() {

  var Hapi = require( 'hapi' );
  var server = new Hapi.Server();
	var config = require( './app-config.js' );
	var myFS = require( './factory.filesystem.js' );
  var fs = require('fs');

  server.connection( { port: config.server.port, host: config.server.hostname } );

	server.route({
		method: 'GET',
		path: '/',
		handler: function ( request, reply) {
				reply( config.server.defaultText );
		}
	});

  // test for this server method responding via http in spec/routes.spec.js
  // test for myFS (inside handler) correctly writing file in fs.spec.js
  // for both together - http method results in correct writing -
  // requires an integration test, next example

//writes to a file from HTTP call
  server.route({
		method: 'POST',
		path: '/chat/subject',
		handler: function ( request, reply ) {
      console.log("HELLO");
    console.log(request.payload);


      myFS( './test.txt', request.payload.message, function( err ){ console.log( err ); } );
      reply( config.server.defaultText );
		}
	});

// get text from file and return in response
  server.route({
		method: 'GET',
		path: '/chat/subject',
		handler: function ( request, reply ) {
      fs.readFile('./test.txt', 'utf8', function(err, data) {
        reply(data);
      });
		}
	});

	server.app.start = function( callback ) {
		( !callback ) ? callback = function(){} : undefined;
		server.start( function( err ){
			if ( err ) {
				throw err;
			}
			console.log( 'Server running at: ', server.info.uri );
			return callback();
		});
  };
  return server;
};
