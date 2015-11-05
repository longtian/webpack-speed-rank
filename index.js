/**
 * Created by wyvernnot on 15-10-13.
 */
var redis = require('redis');
var once = require('once');

/**
 *
 * @param redis_options redis connection options or connection string
 * @param callback
 * @constructor
 */
function RankPlugin(redis_options, cb) {
  "use strict";

  this.callback = cb || console.log.bind(console);
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

    var client = redis.createClient(self.redis_options, {
      connect_timeout: 5000,
      max_attempts: 1
    });

    // the process can exit if no more commands to sent
    client.unref();

    client.on('ready', function () {
      client.zadd('score', duration, id, function () {
        client.zcard('score', function (err, count) {
          client.zrevrank('score', id, function (err, rank) {
            result.rank = rank / count * 100;
            self.callback.call(compiler, null, result);
          });
        });
      });
    });

    // in case of error
    client.on('error', function (err) {
      self.callback.call(compiler, err);
    });

  };

  compiler.plugin('done', once(onceHandler));
};

module.exports = RankPlugin;