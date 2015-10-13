/**
 * Created by wyvernnot on 15-10-13.
 */
var redis = require('redis');

/**
 *
 * @param cb success callback
 * @param redis_options redis connection options
 * @constructor
 */
function RankPlugin(cb, redis_options) {
  "use strict";

  this.callback = cb || console.log.bind(console);
  if (redis_options) {
    this.redis_client = redis.createClient(redis_options);
  }
}

RankPlugin.prototype.apply = function (compiler) {
  "use strict";

  var _this = this;

  var onceHandler = function (stat) {

    // generate an unique id
    var id = Date.now() + ' ' + Math.random();
    var duration = stat.endTime - stat.startTime;
    var result = {
      startTime: stat.startTime,
      endTime: stat.endTime,
      duration: duration,
    };

    if (_this.redis_client) {
      var client = _this.redis_client;
      client.zadd('score', duration, id, function () {
        client.zcard('score', function (err, count) {
          client.zrevrank('score', id, function (err, rank) {
            // count
            // rank
            result.rank = rank / count * 100;
            _this.callback.call(compiler, result);
            client.end();
            onceHandler = function () {
            };
          });
        });
      });
    } else {
      _this.callback.call(compiler, result);
    }
  };


  compiler.plugin('done', function () {
    onceHandler.apply(this, arguments);
  });
};

module.exports = RankPlugin;