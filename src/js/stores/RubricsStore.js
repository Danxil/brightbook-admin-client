import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

const RubricsStore = assign({}, BaseStore, {
  _id: 'id',

  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.START_LOAD_RUBRICS:
        RubricsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_LOAD_RUBRICS:
        RubricsStore.addItems(action.rubrics)

        RubricsStore.emitChange()

        break;
      case Constants.ActionTypes.START_ADD_RUBRIC:
        RubricsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_ADD_RUBRIC:
        RubricsStore.addItems(action.rubric)

        RubricsStore.emitChange()

        break;
      case Constants.ActionTypes.START_EDIT_RUBRIC:
        RubricsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_EDIT_RUBRIC:
        RubricsStore.editItem(action.rubric)

        RubricsStore.emitChange()

        break;
      case Constants.ActionTypes.START_DELETE_RUBRIC:
        RubricsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_DELETE_RUBRIC:
        RubricsStore.deleteItem(action.id)

        RubricsStore.emitChange()

        break;
    }
  })
});

export default RubricsStore;
