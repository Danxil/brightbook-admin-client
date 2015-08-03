import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import rest from '../api/rest.js';
import RubricsStore from '../stores/RubricsStore.js';
import vow from 'vow'
import _ from 'underscore'

export default {
  loadRubrics(id) {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_LOAD_RUBRICS
    })

    return rest.getRubrics(id).then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_LOAD_RUBRICS,
        rubrics: response.data
      });
    })
  },

  addRubric(data) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_ADD_RUBRIC
    })

    rest.addRubric(data).then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_ADD_RUBRIC,
        rubric: response.data
      });

      def.resolve()
    })

    return def.promise()
  },

  editRubric(id, data) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_EDIT_RUBRIC
    })

    data = _.clone(data)
    delete data.books

    rest.editRubric(id, data).then(function(result) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_EDIT_RUBRIC,
        rubric: result.data
      });

      def.resolve()
    })

    return def.promise()
  },

  deleteRubric(id) {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_DELETE_RUBRIC
    })

    return rest.deleteRubric(id).then(function() {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_DELETE_RUBRIC,
        id: id
      });
    })
  },
};
