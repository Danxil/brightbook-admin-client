import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

const BooksStore = assign({}, BaseStore, {
  _id: 'id',

  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.START_LOAD_BOOKS:
        BooksStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_LOAD_BOOKS:
        BooksStore.addItems(action.books)

        BooksStore.emitChange()

        break;
      case Constants.ActionTypes.START_ADD_BOOK:
        BooksStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_ADD_BOOK:
        BooksStore.addItems(action.book)

        BooksStore.emitChange()

        break;
      case Constants.ActionTypes.START_EDIT_BOOK:
        BooksStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_EDIT_BOOK:
        BooksStore.editItem(action.book)

        BooksStore.emitChange()

        break;
      case Constants.ActionTypes.START_DELETE_BOOK:
        BooksStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_DELETE_BOOK:
        BooksStore.deleteItem(action.id)

        BooksStore.emitChange()

        break;
    }
  })
});

export default BooksStore;
