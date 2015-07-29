import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import rest from '../api/rest.js';
import BooksStore from '../stores/BooksStore.js';
import vow from 'vow'

export default {
  loadBooks(id) {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_LOAD_BOOKS
    })

    return rest.getBooks(id).then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_LOAD_BOOKS,
        books: response.data
      });
    })
  },

  addBook(data, form) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_ADD_BOOK
    })

    rest.addBook(data).then(function(response) {
      rest.upload('book', response.data.id, 'image', form).then(function(response) {
        Dispatcher.handleServerAction({
          type: Constants.ActionTypes.SUCCESS_ADD_BOOK,
          book: response.data
        })

        def.resolve()
      })
    })

    return def.promise()
  },

  editBook(id, data, form) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_EDIT_BOOK
    })

    var defArr = []

    data.images.forEach(function(item) {
      let def = vow.defer()
      defArr.push(def.promise())

      if (item.delete)
        rest.removeUpload('book', id, 'image', item.id).then(function(response) {
          def.resolve(response)
        })
    })


    defArr.push(rest.upload('book', id, 'image', form))
    defArr.push(rest.editBook(id, data))

    vow.all(defArr).then(function(all) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_EDIT_BOOK,
        book: all[all.length - 1].data
      });

      def.resolve()
    })

    return def.promise()
  },

  deleteBook(id) {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_DELETE_BOOK
    })

    return rest.deleteBook(id).then(function() {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_DELETE_BOOK,
        id: id
      });
    })
  },
};
