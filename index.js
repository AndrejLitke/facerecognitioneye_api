//'use strict';

var server = require('./server');
var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server has started on localhost, port %d', port);
});