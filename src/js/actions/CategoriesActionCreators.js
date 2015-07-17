import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import rest from '../api/rest.js';

export default {
  loadCategories(query, page) {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_LOAD_CATEGORIES
    });

    rest.getCategories().then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_LOAD_CATEGORIES,
        categories: response.data
      });
    })
  }
};
