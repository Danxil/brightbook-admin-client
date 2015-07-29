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

  addCategory(data, form) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_ADD_CATEGORY
    })

    rest.addCategory(data).then(function(response) {
      rest.upload('category', response.data.id, 'bg', form).then(function(response) {
        Dispatcher.handleServerAction({
          type: Constants.ActionTypes.SUCCESS_ADD_CATEGORY,
          category: response.data
        })

        def.resolve()
      })
    })

    return def.promise()
  },

  editCategory(id, data, form) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_EDIT_CATEGORY
    })

    var defArr = []

    data.bg.forEach(function(item) {
      let def = vow.defer()
      defArr.push(def.promise())

      if (item.delete)
        rest.removeUpload('category', id, 'bg', item.id).then(function(response) {
          def.resolve(response)
        })
    })

    defArr.push(rest.upload('category', id, 'bg', form))
    defArr.push(rest.editCategory(id, data))

    vow.all(defArr).then(function(all) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_EDIT_CATEGORY,
        category: all[all.length - 1].data
      });

      def.resolve()
    })

    return def.promise()
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
