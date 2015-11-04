/**
 * Created by wyvernnot on 15-10-13.
 */
var RankPlugin = require('../');
var compiler = require('./mocks/compiler.js');
var assert = require('assert');

describe('webpack-speed-rank', function () {

  // redis is not running at localhost:16758
  it('should work if redis is not available', function (done) {
    function resultHandler(error,result) {
      assert.ok(!result);
      done();
    }

    var pl = new RankPlugin({port: 16758}, resultHandler);
    pl.apply(compiler);
  });

  // redis is not running at localhost:6379
  it('should work if redis is not available', function () {

    var pl = new RankPlugin({port: 16758});
    pl.apply(compiler);
  });
});