import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';
import _ from 'underscore';

let _data = [];

function addItems(items) {
  _data = _.union(_data, items)
}

const ItemStore = assign({}, BaseStore, {
  getAll() {
    return {
      items: _data
    };
  },

  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.START_LOAD_ITEMS:
        this.loading = true

        ItemStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_LOAD_ITEMS:

        addItems(action.items)
        this.loading = false

        ItemStore.emitChange()

        break;
    }
  })
});

export default ItemStore;
