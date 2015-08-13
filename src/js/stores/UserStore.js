import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

const UserStore = assign({}, BaseStore, {
  _id: 'id',
  _model: {},

  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;

    setTimeout(function() {
      switch(action.type) {
        case Constants.ActionTypes.START_LOAD_USER:
          UserStore.emitChange()

          break;
        case Constants.ActionTypes.SUCCESS_LOAD_USER:
          UserStore.set('user', action.user)
          UserStore.emitChange()
          break;
        case Constants.ActionTypes.ERROR_LOAD_USER:
          UserStore.set('user', null)
          UserStore.emitChange()

          break;
      }
    })
  })
});

export default UserStore;
