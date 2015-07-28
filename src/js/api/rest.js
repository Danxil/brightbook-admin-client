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
      let def = vow.defer()
      let url = Constants.ConfigSources.REST_BASE_URL + '/category'

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
      })


      return def.promise()
    },

    editCategory(id, data) {
      let def = vow.defer()
      let url = Constants.ConfigSources.REST_BASE_URL + '/category/' + id

      var formData = new FormData(data);

      jq.ajax({
        url: url,
        type: 'PUT',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
          def.resolve({data: result})
        }
      })

      return def.promise()
    },

    deleteCategory(id) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/category/' + id

      return jq.ajax({
        url: url,
        type: 'delete'
      })
    },



    getHeaderColors() {
      let url = Constants.ConfigSources.REST_BASE_URL + '/headercolor'

      return jq.get(url)
    },
  }
})(vow)