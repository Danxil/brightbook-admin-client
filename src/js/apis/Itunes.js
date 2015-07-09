import jQuery from 'jquery';
let url = 'https://itunes.apple.com'

export default {
  search(query = '') {
    url = url + '/search?term=' + query
    return jQuery.ajax({url: url, dataType: "jsonp"})
  }
}

