import assign from 'object-assign';
import Constants from '../Constants';
import {EventEmitter} from 'events';
import BaseStore from './BaseStore';
import _ from 'underscore';

export default assign({}, BaseStore, {
  // Allow Controller-View to register itself with store

  _model: [],

  deleteItem(id) {
    for (let i = 0; i < this._model.length; i++) {
      if (this._model[i][this._id] == id)
        this._model.splice(i, 1)
    }
  },

  editItem(editedItem) {
    _.each(this._model, function(item, index) {
      if (editedItem[this._id] == item[this._id])
        this._model[index] = item
    }.bind(this))
  },

  addItems(items) {
    if (!items)
      return

    if (!_.isArray(items))
      items = [items]

    for (let i = 0; i < items.length; i++) {
      for (let ii = 0; ii < this._model.length; ii++) {
        if (this._model[ii][this._id] != items[i][this._id])
          continue

        this._model[ii] = items.splice(i, 1)[0]
        i--

        break
      }
    }

    this._model = _.union(this._model, items)
  },

  getOne(id) {
    return _.find(this._model, function(item) {
      return item[this._id] == id
    }.bind(this))
  },

  clearAll() {
    this._model = [];
  },
});
