/**
 * Created by wyvernnot on 15-10-21.
 *
 * webpack compiler mock
 */
module.exports = {
  /**
   *
   * @param evt {String} eventName
   * @param handler {function}
   */
  plugin: function (evt, handler) {
    function triggerEventLater() {
      handler({
        startTime: 0,
        endTime: 0
      });
    }

    // event will be triggered multiple times, but the plugin is only intersted in the first occurence
    process.nextTick(triggerEventLater);
    process.nextTick(triggerEventLater)
  }
}