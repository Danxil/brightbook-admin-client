import ajax from 'reqwest';
import vow from 'vow'
let URL = 'https://itunes.apple.com'

export default (function(vow){
  return {
    search(query, page) {
      let def = vow.defer()

      let limit = 5 * page
      let url = URL + '/search?term=' + query + '&media=musicVideo&limit=' + limit

      ajax({url: url, method: 'get', type: 'jsonp'}, function(response) {
        response.results = response.results.splice((page - 1) * 5, 5)
        def.resolve(response)
      })

      return def.promise()
    }
  }
})(vow)