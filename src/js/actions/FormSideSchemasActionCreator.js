import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import rest from '../api/rest.js';
import vow from 'vow'

export default {
  loadFormSideSchemas() {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_LOAD_FORM_SIDE_SCHEMAS
    })

    return rest.getFormSideSchemas().then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_LOAD_FORM_SIDE_SCHEMAS,
        formSideSchemas: response.data
      });
    })
  },
};
