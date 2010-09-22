var accept = function() {
  var types = [
    "application/xml",
    "application/xhtml+xml",
    "text/html",
    "text/plain"
  ];

  function accept( write, mime_type ) {
    return fab.stream( function( yes ) {
      return fab.stream( function( no ) {
        return write( function( write, head ) {
          //console.log(inspect(head));
          return ( head.headers.accept.indexOf(mime_type) > -1 ? yes : no )( write, head );
        })();
      });
    });
  }

  for ( var i = types.length; i--; ) ( function( type ) {
    var short_type = type.split('/')[1].replace(/\W/, '_').toUpperCase();
    accept[ short_type ] = function( write ) {
      return accept( write, type );
    };
  })( types[ i ] );

  return accept;
}();

module.exports = accept;
