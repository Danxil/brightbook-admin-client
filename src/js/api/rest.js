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

      return jq.post(url, data)
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
    }
  }
})(vow)