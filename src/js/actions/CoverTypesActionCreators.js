import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import rest from '../api/rest.js';
import CoverTypesStore from '../stores/CoverTypesStore.js';
import vow from 'vow'
import _ from 'underscore'

export default {
  loadCoverTypes(id) {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_LOAD_COVER_TYPES
    })

    return rest.getCoverTypes(id).then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_LOAD_COVER_TYPES,
        coverTypes: response.data
      });
    })
  },

  addCoverType(data) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_ADD_COVER_TYPE
    })

    rest.addCoverType(data).then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_ADD_COVER_TYPE,
        coverType: response.data
      });

      def.resolve()
    })

    return def.promise()
  },

  editCoverType(id, data) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_EDIT_COVER_TYPE
    })

    data = _.clone(data)
    delete data.books

    rest.editCoverType(id, data).then(function(result) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_EDIT_COVER_TYPE,
        coverType: result.data
      });

      def.resolve()
    })

    return def.promise()
  },

  deleteCoverType(id) {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_DELETE_COVER_TYPE
    })

    return rest.deleteCoverType(id).then(function() {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_DELETE_COVER_TYPE,
        id: id
      });
    })
  },
};
