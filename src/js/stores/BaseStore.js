import assign from 'object-assign';
import Constants from '../Constants';
import {EventEmitter} from 'events';

export default assign({}, EventEmitter.prototype, {
  loading: false,

  addChangeListener(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },

  emitChange() {
    this.emit(Constants.CHANGE_EVENT);
  }
});
