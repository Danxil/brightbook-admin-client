import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import rest from '../api/rest.js';
import AuthorsStore from '../stores/AuthorsStore.js';
import vow from 'vow'
import _ from 'underscore'
import Cookie from 'js-cookie'

export default {
  login(data) {
    return rest.login(data).then(function(response) {
      Cookie.set('token', response.data.token, {path: '/'})
    })
  },
  checkAdmin() {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_LOAD_USER
    })

    return rest.checkAdmin().then(function(result) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_LOAD_USER,
        user: result.data
      })
    }, function() {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.ERROR_LOAD_USER
      })
    })
  },
};
