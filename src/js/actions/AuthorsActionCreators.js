import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import rest from '../api/rest.js';
import AuthorsStore from '../stores/AuthorsStore.js';
import vow from 'vow'
import _ from 'underscore'


export default {
  loadAuthors(id) {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_LOAD_AUTHORS
    })

    return rest.getAuthors(id).then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_LOAD_AUTHORS,
        authors: response.data
      });
    })
  },

  addAuthor(data, forms) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_ADD_AUTHOR
    })

    rest.addAuthor(data).then(function(response) {
      var defArr = []

      _.mapObject(forms, function(value, key) {
        defArr.push(rest.upload('author', response.data.id, key, forms[key]))
      })

      vow.all(defArr).then(function(all) {
        Dispatcher.handleServerAction({
          type: Constants.ActionTypes.SUCCESS_ADD_AUTHOR,
          author: all[all.length - 1].data
        })

        def.resolve(all[all.length - 1].data)
      })
    })

    return def.promise()
  },

  editAuthor(id, data, forms) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_EDIT_AUTHOR
    })

    rest.editAuthor(id, data).then(function() {
      var defArr = []

      _.mapObject(forms, function(value, key) {
        defArr.push(rest.upload('author', id, key, forms[key]))

        data[key + 's'].forEach(function(item) {
          if (!item.delete)
            return

          defArr.push(rest.removeUpload('author', id, key, item.id))
        })
      })

      vow.all(defArr).then(function(all) {
        Dispatcher.handleServerAction({
          type: Constants.ActionTypes.SUCCESS_EDIT_AUTHOR,
          author: all[all.length - 1].data
        });

        def.resolve()
      })
    })

    return def.promise()
  },

  deleteAuthor(id) {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_DELETE_AUTHOR
    })

    return rest.deleteAuthor(id).then(function() {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_DELETE_AUTHOR,
        id: id
      });
    })
  },
};
