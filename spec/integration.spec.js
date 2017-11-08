describe( 'OURTESTS Hapi/FS integration', function(){
  var fs = require( 'fs' );
  var config = require( './test-config.js' );
	var serverScript = require( '../script.server-startup.js' );
	var server = serverScript();

  it( 'should write to a file from an HTTP call', function( done ){
    var req = {
      method: 'POST',
      url: '/chat/subject',
      payload: {message: 'jello'}
    };

    fs.unlink( config.fs.writePath, function(){
      server.inject( req, res => {
        fs.readFile( config.fs.writePath, 'utf8', function( err, data ){
          console.log(req);
          expect( err ).toEqual( null );
          expect( data).toEqual( req.payload.message.toString() );
          done();
        });
      });
    });
  });

  xit( 'should give a response with message and 200 status', function( done ){
    var req = {
      method: 'GET',
      url: '/chat/subject',
      payload: JSON.stringify({message: 'Hello'})
    };

    fs.unlink( config.fs.writePath, function(){
      server.inject( req, res => {
        expect(res.statusCode).toEqual(200);
      });
      done();
    });
  });
});
