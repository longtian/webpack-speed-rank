/**
 * Created by wyvernnot on 15-10-13.
 */
var redis = require('redis');

var noop = function () {
  // just an empty function
};

/**
 *
 * @param cb success callback
 * @param redis_options redis connection options
 * @constructor
 */
function RankPlugin(cb, redis_options) {
  "use strict";

  this.callback = cb || noop;
  this.redis_options = redis_options;
}

RankPlugin.prototype.apply = function (compiler) {
  "use strict";

  var self = this;

  var onceHandler = function (stat) {

    // generate an unique id
    var id = Date.now() + ' ' + Math.random();
    var duration = stat.endTime - stat.startTime;
    var result = {
      startTime: stat.startTime,
      endTime: stat.endTime,
      duration: duration,
    };

    var client = redis.createClient(self.redis_options);

    client.on('ready', function () {
      client.zadd('score', duration, id, function () {
        client.zcard('score', function (err, count) {
          client.zrevrank('score', id, function (err, rank) {
            result.rank = rank / count * 100;
            self.callback.call(compiler, result);
            //client.end();
          });
        });
      });
    });

    // in case of error
    client.on('error', function () {
      self.callback.call(compiler, result);
    });

    onceHandler = noop;
  };


  compiler.plugin('done', function () {
    onceHandler.apply(this, arguments);
  });
};

module.exports = RankPlugin;