import jq from 'jquery'
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



    getRubrics(id) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/rubric'
      if (id) url += '/' + id

      return jq.get(url)
    },
    addRubric(data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/rubric'

      return jq.ajax({
        url: url,
        type: 'POST',
        data: data
      })
    },
    editRubric(id, data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/rubric/' + id

      return jq.ajax({
        url: url,
        type: 'put',
        data: data
      })
    },
    deleteRubric(id) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/rubric/' + id

      return jq.ajax({
        url: url,
        type: 'delete'
      })
    },



    getAuthors(id) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/author'
      if (id) url += '/' + id

      return jq.get(url)
    },
    addAuthor(data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/author'

      return jq.ajax({
        url: url,
        type: 'POST',
        data: data
      })
    },
    editAuthor(id, data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/author/' + id

      return jq.ajax({
        url: url,
        type: 'put',
        data: data
      })
    },
    deleteAuthor(id) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/author/' + id

      return jq.ajax({
        url: url,
        type: 'delete'
      })
    },
    
    


    getCoverTypes(id) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/covertype'
      if (id) url += '/' + id

      return jq.get(url)
    },
    addCoverType(data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/covertype'

      return jq.ajax({
        url: url,
        type: 'POST',
        data: data
      })
    },
    editCoverType(id, data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/covertype/' + id

      return jq.ajax({
        url: url,
        type: 'put',
        data: data
      })
    },
    deleteCoverType(id) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/covertype/' + id

      return jq.ajax({
        url: url,
        type: 'delete'
      })
    },



    getFormats(id) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/bookformat'
      if (id) url += '/' + id

      return jq.get(url)
    },
    addFormat(data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/bookformat'

      return jq.ajax({
        url: url,
        type: 'POST',
        data: data
      })
    },
    editFormat(id, data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/bookformat/' + id

      return jq.ajax({
        url: url,
        type: 'put',
        data: data
      })
    },
    deleteFormat(id) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/bookformat/' + id

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
    associateBook(id, associate, childId) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/book/' + id + '/' + associate + '/' + childId
      return jq.ajax({
        url: url,
        type: 'post'
      })
    },
    unassociateBook(id, associate, childId) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/book/' + id + '/' + associate + '/' + childId
      return jq.ajax({
        url: url,
        type: 'delete'
      })
    },
    
    

    getBookReviews(id) {
      let def = vow.defer()
      let url = Constants.ConfigSources.REST_BASE_URL + '/book/' + id + '/review'

      jq.ajax({
        url: url,
        type: 'get',
        success: function(result) {
          def.resolve(result)
        },
        error: function() {
          def.reject()
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
    
    
    
    
    getBookReasons(id) {
      let def = vow.defer()
      let url = Constants.ConfigSources.REST_BASE_URL + '/book/' + id + '/reason'

      jq.ajax({
        url: url,
        type: 'get',
        success: function(result) {
          def.resolve(result)
        },
        error: function() {
          def.reject()
        }
      })

      return def.promise()
    },
    editBookReason(id, data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/bookreason/' + id

      return jq.ajax({
        url: url,
        type: 'put',
        data: data
      })
    },
    addBookReason(data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/bookreason'

      return jq.ajax({
        url: url,
        type: 'post',
        data: data
      })
    },
    associateBookAndBookReason(id, childId) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/book/' + id + '/reasons/' + childId

      return jq.ajax({
        url: url,
        type: 'post'
      })
    },
    
    


    getContacts(id) {
      let def = vow.defer()
      let url = Constants.ConfigSources.REST_BASE_URL + '/contact'
      if (id) url += '/' + id

      jq.ajax({
        url: url,
        type: 'get',
        success: function(result) {
          def.resolve(result)
        },
        error: function() {
          def.reject()
        }
      })

      return def.promise()
    },
    editContactField(id, field, data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/' + field + '/' + id

      return jq.ajax({
        url: url,
        type: 'put',
        data: data
      })
    },
    deleteContactField(id, field) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/' + field + '/' + id

      return jq.ajax({
        url: url,
        type: 'delete',
      })
    },
    addContactField(field, data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/' + field

      return jq.ajax({
        url: url,
        type: 'post',
        data: data
      })
    },
    associateContactAndContactField(id, field, filedId) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/contact/' + id + '/' + field + '/' + filedId

      return jq.ajax({
        url: url,
        type: 'post'
      })
    },
    
    


    getHeaderColors() {
      let url = Constants.ConfigSources.REST_BASE_URL + '/headercolor'

      return jq.get(url)
    },




    getFormSideSchemas() {
      let url = Constants.ConfigSources.REST_BASE_URL + '/formsideschema'

      return jq.get(url)
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
        },
        error: function() {
          def.reject()
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
          },
          error: function() {
            def.reject()
          }
        });

      return def.promise()
    },

    login(data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/auth/signin-admin'

      return jq.post(url, data)
    },

    checkAdmin() {
      let url = Constants.ConfigSources.REST_BASE_URL + '/myself-admin'

      return jq.get(url)
    },


    getMerchant() {
      let def = vow.defer()
      let url = Constants.ConfigSources.REST_BASE_URL + '/merchant/1'

      jq.ajax({
        url: url,
        type: 'get',
        success: function(result) {
          def.resolve(result)
        },
        error: function() {
          def.reject()
        }
      })

      return def.promise()
    },
    editMerchant(data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/merchant/1'

      return jq.ajax({
        url: url,
        type: 'put',
        data: data
      })
    },





    getSliders(id) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/slider'
      if (id) url += '/' + id

      return jq.get(url)
    },
    addSlider(data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/slider'

      return jq.ajax({
        url: url,
        type: 'POST',
        data: data
      })
    },
    editSlider(id, data) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/slider/' + id

      return jq.ajax({
        url: url,
        type: 'put',
        data: data
      })
    },
    deleteSlider(id) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/slider/' + id

      return jq.ajax({
        url: url,
        type: 'delete'
      })
    },
  }
})(vow)