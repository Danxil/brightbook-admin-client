import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

const BookReasonsStore = assign({}, BaseStore, {
  _id: 'id',

  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.START_LOAD_BOOK_REASONS:
        BookReviewsStore.clearAll()
        BookReasonsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_LOAD_BOOK_REASONS:
        BookReasonsStore.addItems(action.bookReasons)

        BookReasonsStore.emitChange()

        break;
      case Constants.ActionTypes.START_ADD_BOOK_REASON:
        BookReasonsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_ADD_BOOK_REASON:
        BookReasonsStore.addItems(action.bookReason)

        BookReasonsStore.emitChange()

        break;
      case Constants.ActionTypes.START_EDIT_BOOK_REASON:
        BookReasonsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_EDIT_BOOK_REASON:
        BookReasonsStore.editItem(action.bookReason)

        BookReasonsStore.emitChange()

        break;
      case Constants.ActionTypes.START_DELETE_BOOK_REASON:
        BookReasonsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_DELETE_BOOK_REASON:
        BookReasonsStore.deleteItem(action.id)

        BookReasonsStore.emitChange()

        break;
    }
  })
});

export default BookReasonsStore;
