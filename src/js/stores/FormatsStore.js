import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import CollectionStore from './CollectionStore';
import assign from 'object-assign';

const FormatsStore = assign({}, CollectionStore, {
  _id: 'id',

  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.START_LOAD_FORMATS:
        FormatsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_LOAD_FORMATS:
        FormatsStore.addItems(action.formats)

        FormatsStore.emitChange()

        break;
      case Constants.ActionTypes.START_ADD_FORMAT:
        FormatsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_ADD_FORMAT:
        FormatsStore.addItems(action.format)

        FormatsStore.emitChange()

        break;
      case Constants.ActionTypes.START_EDIT_FORMAT:
        FormatsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_EDIT_FORMAT:
        FormatsStore.editItem(action.format)

        FormatsStore.emitChange()

        break;
      case Constants.ActionTypes.START_DELETE_FORMAT:
        FormatsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_DELETE_FORMAT:
        FormatsStore.deleteItem(action.id)

        FormatsStore.emitChange()

        break;
    }
  })
});

export default FormatsStore;
