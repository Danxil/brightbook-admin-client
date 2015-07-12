import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';
import _ from 'underscore';

let _model = {
  items: [],
  page: 1,
  loading: false,
  searchString: '',
  fullItems: false
}


function addItems(items) {
  if (_model.page == 1)
    _model.items = items
  else
    _model.items = _.union(_model.items, items)
}

const ItemStore = assign({}, BaseStore, {
  getAll() {
    return _model;
  },

  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;
    switch(action.type) {
      case Constants.ActionTypes.START_LOAD_ITEMS:
        _model.loading = true

        ItemStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_LOAD_ITEMS:
        _model.loading = false
        _model.page = action.page
        _model.searchString = action.searchString
        _model.fullItems = action.items.length < 5

        addItems(action.items)

        ItemStore.emitChange()

        break;
    }
  })
});

export default ItemStore;
