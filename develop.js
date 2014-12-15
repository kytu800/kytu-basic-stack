var app = require("./server");
var debug = require('debug')('tmp');

var server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + server.address().port);
    debug('Express server listening on port ' + server.address().port);
});