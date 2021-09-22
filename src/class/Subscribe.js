export default class Subscribe {
  static instance = null
  constructor() {
    if (Subscribe.instance) {
      return Subscribe.instance
    }
    this.event = {}
    Subscribe.instance = this
  }
  on(event, callback) {
    if (!this.event[event]) {
      this.event[event] = {
        name: event,
        callbackList: []
      }
    }
    this.event[event].callbackList.push(callback)
  }
  remove(event) {
    this.event[event] = null
  }
  emit(event, data = {}) {
    if (this.event[event]) {
      let emitEvent = this.event[event]
      for (let callback of emitEvent.callbackList) {
        callback(data)
      }
    }
  }
}
