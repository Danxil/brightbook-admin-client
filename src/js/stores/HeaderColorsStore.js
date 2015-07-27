import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

const HeaderColorsStore = assign({}, BaseStore, {
  _id: 'id',

  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.START_LOAD_HEADER_COLORS:
        HeaderColorsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_LOAD_HEADER_COLORS:
        HeaderColorsStore.addItems(action.headerColors)
        
        HeaderColorsStore.emitChange()

        break;
    }
  })
});

export default HeaderColorsStore;
