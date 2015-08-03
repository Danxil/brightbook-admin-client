import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import rest from '../api/rest.js';
import BooksStore from '../stores/BooksStore.js';
import vow from 'vow'
import _ from 'underscore'

export default {
  loadBooks(id) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_LOAD_BOOKS
    })

    rest.getBooks(id).then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_LOAD_BOOKS,
        books: response.data
      });

      def.resolve()
    })

    return def.promise()
  },

  addBook(data, selects, forms) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_ADD_BOOK
    })

    rest.addBook(data).then(function(response) {
      var defArr = []

      _.mapObject(selects, function(value, key) {
        value.forEach(function(item) {
          defArr.push(rest.associateBook(response.data.id, key, item))
        })
      })


      _.mapObject(forms, function(value, key) {
        defArr.push(rest.upload('book', response.data.id, key, forms[key]))
      })

      vow.all(defArr).then(function(all) {
        Dispatcher.handleServerAction({
          type: Constants.ActionTypes.SUCCESS_ADD_BOOK,
          book: all[all.length - 1].data
        })

        def.resolve(all[all.length - 1].data)
      })
    })

    return def.promise()
  },

  editBook(id, data, selects, forms) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_EDIT_BOOK
    })

    rest.editBook(id, data).then(function() {
      var defArr = []

      _.mapObject(selects, function(value, key) {
        value.forEach(function(item) {
          defArr.push(rest.associateBook(id, key, item))
        })

        data[key].forEach(function(item) {
          if (value.indexOf(item.id.toString()) == -1) {
            defArr.push(rest.unassociateBook(id, key, item.id))
          }
        })
      })

      _.mapObject(forms, function(value, key) {
        defArr.push(rest.upload('book', id, key, forms[key]))

        data[key + 's'].forEach(function(item) {
          if (!item.delete)
            return

          defArr.push(rest.removeUpload('book', id, key, item.id))
        })
      })

      vow.all(defArr).then(function(all) {
        Dispatcher.handleServerAction({
          type: Constants.ActionTypes.SUCCESS_EDIT_BOOK,
          book: all[all.length - 1].data
        });

        def.resolve()
      })
    })

    return def.promise()
  },

  deleteBook(id) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_DELETE_BOOK
    })

    rest.deleteBook(id).then(function() {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_DELETE_BOOK,
        id: id
      });

      def.resolve()
    })

    return def.promise()
  },
};
