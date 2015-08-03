import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

const AuthorStore = assign({}, BaseStore, {
  _id: 'id',

  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.START_LOAD_AUTHORS:
        AuthorStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_LOAD_AUTHORS:
        AuthorStore.addItems(action.authors)

        AuthorStore.emitChange()

        break;
      case Constants.ActionTypes.START_ADD_AUTHOR:
        AuthorStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_ADD_AUTHOR:
        AuthorStore.addItems(action.author)

        AuthorStore.emitChange()

        break;
      case Constants.ActionTypes.START_EDIT_AUTHOR:
        AuthorStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_EDIT_AUTHOR:
        AuthorStore.editItem(action.author)

        AuthorStore.emitChange()

        break;
      case Constants.ActionTypes.START_DELETE_AUTHOR:
        AuthorStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_DELETE_AUTHOR:
        AuthorStore.deleteItem(action.id)

        AuthorStore.emitChange()

        break;
    }
  })
});

export default AuthorStore;
