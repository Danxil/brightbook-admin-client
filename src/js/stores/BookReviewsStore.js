import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

const BookReviewsStore = assign({}, BaseStore, {
  _id: 'id',

  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.START_LOAD_BOOK_REVIEWS:
        BookReviewsStore.clearAll()
        BookReviewsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_LOAD_BOOK_REVIEWS:
        BookReviewsStore.addItems(action.bookReviews)

        BookReviewsStore.emitChange()

        break;
      case Constants.ActionTypes.START_ADD_BOOK_REVIEW:
        BookReviewsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_ADD_BOOK_REVIEW:
        BookReviewsStore.addItems(action.bookReview)

        BookReviewsStore.emitChange()

        break;
      case Constants.ActionTypes.START_EDIT_BOOK_REVIEW:
        BookReviewsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_EDIT_BOOK_REVIEW:
        BookReviewsStore.editItem(action.bookReview)

        BookReviewsStore.emitChange()

        break;
      case Constants.ActionTypes.START_DELETE_BOOK_REVIEW:
        BookReviewsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_DELETE_BOOK_REVIEW:
        BookReviewsStore.deleteItem(action.id)

        BookReviewsStore.emitChange()

        break;
    }
  })
});

export default BookReviewsStore;
