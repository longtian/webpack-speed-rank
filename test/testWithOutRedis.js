/**
 * Created by wyvernnot on 15-10-13.
 */
var RankPlugin = require('../');
var compiler = require('./mocks/compiler.js');
var assert = require('assert');

describe('webpack-speed-rank', function () {

  // redis is not running at localhost:6379
  it('should work if redis is not available', function (done) {
    function resultHandler(result) {
      assert.ok(!result.rank);
      done();
    }

    var pl = new RankPlugin(resultHandler, {port: 16758});
    pl.apply(compiler);
  });
});