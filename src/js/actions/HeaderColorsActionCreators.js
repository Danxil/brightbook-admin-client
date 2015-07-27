import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import rest from '../api/rest.js';
import CategoriesStore from '../stores/CategoriesStore';
import vow from 'vow'

export default {
  loadHeaderColors() {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_LOAD_HEADER_COLORS
    })

    return rest.getHeaderColors().then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_LOAD_HEADER_COLORS,
        headerColors: response.data
      });
    })
  },
};
