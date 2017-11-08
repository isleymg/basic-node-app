var ServerFactory = require('./factory.server.js');
var serverScript = require( './script.server-startup.js' );

var server = serverScript();

server.start();
console.log('Listening at localhost:3000');
