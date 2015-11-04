/**
 * Created by wyvernnot on 15-10-13.
 * @TODO mock redis
 *
 */
var RankPlugin = require('../');
var compiler = require('./mocks/compiler.js');
var assert = require('assert');

describe('webpack-speed-rank', function () {

  // redis running at localhost:6379
  it('should work if redis is available', function (done) {
    function resultHandler(error, result) {
      assert.equal(result.startTime, 0);
      assert.equal(result.endTime, 0);
      assert.equal(result.duration, 0);
      assert.equal(result.rank, 0);
      done();
    }

    var pl = new RankPlugin(null, resultHandler);
    pl.apply(compiler);
  });

});