import ajax from 'reqwest';
let URL = 'https://itunes.apple.com'

export default {
  search(query = 'Jo') {
    let url = URL + '/search?term=' + query + '&media=musicVideo&limit=5'
    return ajax({url: url, method: 'get', type: 'jsonp'})
  }
}

