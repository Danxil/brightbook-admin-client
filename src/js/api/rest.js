import jq from 'jquery'
import fileUpload from 'blueimp-file-upload';
import vow from 'vow'
import Constants from '../Constants'

export default (function(vow){
  return {
    getCategories(id) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/category'
      if (id) url += '/' + id

      return jq.get(url)
    },

    addCategory(data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/category'

      return jq.ajax({
        url: url,
        type: 'POST',
        data: data
      })
    },

    editCategory(id, data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/category/' + id

      return jq.ajax({
        url: url,
        type: 'put',
        data: data
      })
    },

    deleteCategory(id) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/category/' + id

      return jq.ajax({
        url: url,
        type: 'delete'
      })
    },



    getBooks(id) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/book'
      if (id) url += '/' + id

      return jq.get(url)
    },

    addBook(data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/book'

      return jq.ajax({
        url: url,
        type: 'POST',
        data: data
      })
    },

    editBook(id, data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/book/' + id

      return jq.ajax({
        url: url,
        type: 'put',
        data: data
      })
    },

    deleteBook(id) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/book/' + id

      return jq.ajax({
        url: url,
        type: 'delete'
      })
    },
    
    

    getHeaderColors() {
      let url = Constants.ConfigSources.REST_BASE_URL + '/headercolor'
  
      return jq.get(url)
    },

    getBookReviews(id) {
      let def = vow.defer()
      let url = Constants.ConfigSources.REST_BASE_URL + '/book/' + id + '/review'

      jq.ajax({
        url: url,
        type: 'get',
        success: function(result) {
          def.resolve(result)
        }
      })

      return def.promise()
    },

    editBookReview(id, data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/bookreview/' + id

      return jq.ajax({
        url: url,
        type: 'put',
        data: data
      })
    },

    addBookReview(data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/bookreview'

      return jq.ajax({
        url: url,
        type: 'post',
        data: data
      })
    },

    associateBookAndBookReview(id, childId) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/book/' + id + '/reviews/' + childId

      return jq.ajax({
        url: url,
        type: 'post'
      })
    },

    upload(model, id, property, data) {
      let def = vow.defer()

      let url = Constants.ConfigSources.REST_BASE_URL + '/' + 'upload' + '/' + model + '/' + id + '/' + property

      var formData = new FormData(data);

      jq.ajax({
        url: url,
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
          def.resolve({data: result})
        }
      });

      return def.promise()
    },

    removeUpload(model, id, property, uploadId) {
      let def = vow.defer()

      let url = Constants.ConfigSources.REST_BASE_URL + '/' + 'upload' + '/' + model + '/' + id + '/' + property + '/' + uploadId

        jq.ajax({
          url: url,
          type: 'delete',
          success: function (result) {
            def.resolve({data: result})
          }
        });

      return def.promise()
    }
  }
})(vow)