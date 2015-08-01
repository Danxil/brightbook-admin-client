import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

const BookReviwsStore = assign({}, BaseStore, {
  _id: 'id',

  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.START_LOAD_BOOK_REVIEWS:
        BookReviwsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_LOAD_BOOK_REVIEWS:
        BookReviwsStore.addItems(action.bookReviews)

        BookReviwsStore.emitChange()

        break;
      case Constants.ActionTypes.START_ADD_BOOK_REVIEW:
        BookReviwsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_ADD_BOOK_REVIEW:
        BookReviwsStore.addItems(action.bookReview)

        BookReviwsStore.emitChange()

        break;
      case Constants.ActionTypes.START_EDIT_BOOK_REVIEW:
        BookReviwsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_EDIT_BOOK_REVIEW:
        BookReviwsStore.editItem(action.bookReview)

        BookReviwsStore.emitChange()

        break;
      case Constants.ActionTypes.START_DELETE_BOOK_REVIEW:
        BookReviwsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_DELETE_BOOK_REVIEW:
        BookReviwsStore.deleteItem(action.id)

        BookReviwsStore.emitChange()

        break;
    }
  })
});

export default BookReviwsStore;
