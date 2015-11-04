/**
 * Created by yan on 15-11-4.
 */
var once = require('once');
var equal = require('assert').equal;

describe('once', function () {
  it('should work', function () {

    var count = 0;

    function increase() {
      count++;
    }

    var increaseOneTimeOnly = once(increase);

    increaseOneTimeOnly();
    increaseOneTimeOnly();

    equal(count, 1);

  });
});