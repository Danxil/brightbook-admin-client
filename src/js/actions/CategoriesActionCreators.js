import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import rest from '../api/rest.js';
import CategoriesStore from '../stores/CategoriesStore';
import vow from 'vow'

export default {
  loadCategories(id) {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_LOAD_CATEGORIES
    })

    return rest.getCategories(id).then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_LOAD_CATEGORIES,
        categories: response.data
      });
    })
  },

  addCategory(data) {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_ADD_CATEGORY
    })

    return rest.addCategory(data).then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_ADD_CATEGORY,
        category: response.data
      });
    })
  },

  editCategory(id, data) {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_EDIT_CATEGORY
    })

    return rest.editCategory(id, data).then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_EDIT_CATEGORY,
        category: response.data
      });
    })
  },

  deleteCategory(id) {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_DELETE_CATEGORY
    })

    return rest.deleteCategory(id).then(function() {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_DELETE_CATEGORY,
        id: id
      });
    })
  },
};
