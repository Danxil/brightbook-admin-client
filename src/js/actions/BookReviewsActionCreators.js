import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import rest from '../api/rest.js';
import BookReviewsStore from '../stores/BookReviewsStore.js';
import vow from 'vow'
import _ from 'underscore'

export default {
  loadBookReviews(id) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_LOAD_BOOK_REVIEWS
    })

    rest.getBookReviews(id).then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_LOAD_BOOK_REVIEWS,
        bookReviews: response.data
      })

      def.resolve()
    })

    return def.promise()
  },

  addBookReview(data, forms) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_ADD_BOOK_REVIEW
    })

    rest.addBookReview(data).then(function(response) {
      var defArr = []

      _.mapObject(forms, function(value, key) {
        defArr.push(rest.upload('bookReview', response.data.id, key, forms[key]))
      })

      vow.all(defArr).then(function(all) {
        Dispatcher.handleServerAction({
          type: Constants.ActionTypes.SUCCESS_ADD_BOOK_REVIEW,
          bookReview: all[all.length - 1].data
        })

        def.resolve()
      })
    })

    return def.promise()
  },

  editBookReviews(id, forms) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_EDIT_BOOK_REVIEW
    })

    var defArr = []

    forms.forEach(function(item) {
      var def = vow.defer()
      defArr.push(def.promise())

      delete item.form.book

      if (item.form.id)
        var promise = rest.editBookReview(item.form.id, item.form)
      else
        var promise = rest.addBookReview(item.form)

      promise.then(function(result) {
        var defArr2 = []

        if (item.form.avatars)
          item.form.avatars.forEach(function(item) {
            if (!item.delete)
              return

            defArr2.push(rest.removeUpload('bookreview', result.data.id, 'avatar', item.id))
          })

        vow.all(defArr2).then(function() {
          rest.upload('bookreview', result.data.id, 'avatar', item.files.avatar).then(function() {
            rest.associateBookAndBookReview(id , result.data.id).then(function(result) {
              def.resolve(result)
            }, function() {
              def.reject()
            })
          }, function() {
            def.reject()
          })
        }, function() {
          def.reject()
        })
      }, function() {
        def.reject()
      })
    })

    vow.all(defArr).then(function(all) {
      all.forEach(function(item) {
        Dispatcher.handleServerAction({
          type: Constants.ActionTypes.SUCCESS_EDIT_BOOK_REVIEW,
          bookReview: item.data
        })
      })

      def.resolve()
    }, function() {
      def.reject()
    })

    return def.promise()
  },

  deleteBookReview(id) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_DELETE_BOOK_REVIEW
    })

    rest.deleteBookReview(id).then(function() {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_DELETE_BOOK_REVIEW,
        id: id
      });

      def.resolve()
    })

    return def.promise()
  },
};
