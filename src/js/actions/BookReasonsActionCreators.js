import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import rest from '../api/rest.js';
import BookReasonsStore from '../stores/BookReasonsStore.js';
import vow from 'vow'
import _ from 'underscore'

export default {
  loadBookReasons(id) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_LOAD_BOOK_REASONS
    })

    rest.getBookReasons(id).then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_LOAD_BOOK_REASONS,
        bookReasons: response.data
      })

      def.resolve()
    })

    return def.promise()
  },

  addBookReason(data, forms) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_ADD_BOOK_REASON
    })

    rest.addBookReason(data).then(function(response) {
      var defArr = []

      _.mapObject(forms, function(value, key) {
        defArr.push(rest.upload('bookReason', response.data.id, key, forms[key]))
      })

      vow.all(defArr).then(function(all) {
        Dispatcher.handleServerAction({
          type: Constants.ActionTypes.SUCCESS_ADD_BOOK_REASON,
          bookReason: all[all.length - 1].data
        })

        def.resolve()
      })
    })

    return def.promise()
  },

  editBookReasons(id, forms) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_EDIT_BOOK_REASON
    })

    var defArr = []

    forms.forEach(function(item) {
      var def = vow.defer()
      defArr.push(def.promise())

      delete item.form.book

      if (item.form.id)
        var promise = rest.editBookReason(item.form.id, item.form)
      else
        var promise = rest.addBookReason(item.form)

      promise.then(function(result) {
        var defArr2 = []

        if (item.form.avatars)
          item.form.avatars.forEach(function(item) {
            if (!item.delete)
              return

            defArr2.push(rest.removeUpload('bookreason', result.data.id, 'avatar', item.id))
          })

        vow.all(defArr2).then(function() {
          rest.upload('bookreason', result.data.id, 'avatar', item.files.avatar).then(function() {
            rest.associateBookAndBookReason(id , result.data.id).then(function(result) {
              def.resolve(result)
            })
          })
        })
      })
    })

    vow.all(defArr).then(function(all) {
      console.log(all)
      all.forEach(function(item) {
        Dispatcher.handleServerAction({
          type: Constants.ActionTypes.SUCCESS_EDIT_BOOK_REASON,
          bookReason: item.data
        })
      })

      def.resolve()
    })

    return def.promise()
  },

  deleteBookReason(id) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_DELETE_BOOK_REASON
    })

    rest.deleteBookReason(id).then(function() {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_DELETE_BOOK_REASON,
        id: id
      });

      def.resolve()
    })

    return def.promise()
  },
};
