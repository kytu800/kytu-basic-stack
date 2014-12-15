var local = require("../config/local");

function getMongoURIByUserSetting(options) {
    var auth = '';
    // if found user and passwd, format it as 'user:passwd@'
    if (options.user && options.passwd) {
        auth = options.user + ':' + options.passwd + '@';
    }
    return 'mongodb://' + auth + options.options.host + '/' + options.database;
}

var mongodb_uri = getMongoURIByUserSetting(local.model.mongo);

// mongojs package setup
var collections = ['Basic'];
var mongo = require('mongojs').connect(mongodb_uri, collections);


exports.mongo = mongo;
exports.Basic = mongo.basic;