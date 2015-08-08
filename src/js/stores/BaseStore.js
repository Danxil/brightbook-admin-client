import assign from 'object-assign';
import Constants from '../Constants';
import {EventEmitter} from 'events';
import _ from 'underscore';

export default assign({}, EventEmitter.prototype, {
  // Allow Controller-View to register itself with store

  _model: {},

  addChangeListener(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },

  // triggers change listener above, firing controller-view callback
  emitChange() {
    this.emit(Constants.CHANGE_EVENT);
  },

  clearAll() {
    this._model = {};
  },

  set(field, value) {
    return this._model[field] = value
  },

  get(field) {
    return this._model[field]
  },

  clear(field) {
    delete this._model[field]
  },

  getAll() {
    return this._model;
  },
});
