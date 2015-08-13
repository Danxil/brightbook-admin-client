import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

const MerchantStore = assign({}, BaseStore, {
  _id: 'id',
  _model: {},

  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.START_LOAD_MERCHANT:
        MerchantStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_LOAD_MERCHANT:
        MerchantStore.set('merchant', action.merchant)
        MerchantStore.emitChange()
        break;
      case Constants.ActionTypes.START_EDIT_MERCHANT:
        MerchantStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_EDIT_MERCHANT:
        MerchantStore.set('merchant', action.merchant)

        MerchantStore.emitChange()

        break;
    }
  })
});

export default MerchantStore;
