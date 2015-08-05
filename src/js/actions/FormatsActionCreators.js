import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import rest from '../api/rest.js';
import FormatsStore from '../stores/FormatsStore.js';
import vow from 'vow'
import _ from 'underscore'

export default {
  loadFormats(id) {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_LOAD_FORMATS
    })

    return rest.getFormats(id).then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_LOAD_FORMATS,
        formats: response.data
      });
    })
  },

  addFormat(data) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_ADD_FORMAT
    })

    rest.addFormat(data).then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_ADD_FORMAT,
        format: response.data
      });

      def.resolve()
    })

    return def.promise()
  },

  editFormat(id, data) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_EDIT_FORMAT
    })

    data = _.clone(data)
    delete data.books

    rest.editFormat(id, data).then(function(result) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_EDIT_FORMAT,
        format: result.data
      });

      def.resolve()
    })

    return def.promise()
  },

  deleteFormat(id) {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_DELETE_FORMAT
    })

    return rest.deleteFormat(id).then(function() {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_DELETE_FORMAT,
        id: id
      });
    })
  },
};
