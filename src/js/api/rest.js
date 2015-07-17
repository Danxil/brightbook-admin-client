import jq from 'jquery'
import vow from 'vow'
import Constants from '../Constants'

export default (function(vow){
  return {
    getCategories(id) {
      let url = Constants.ConfigSources.REST_BASE_URL + '/category'
      if (id) url += '/' + id

      return jq.get(url)
    }
  }
})(vow)