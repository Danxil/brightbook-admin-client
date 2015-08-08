import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import CollectionStore from './CollectionStore';
import assign from 'object-assign';

const CoverTypesStore = assign({}, CollectionStore, {
  _id: 'id',

  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.START_LOAD_COVER_TYPES:
        CoverTypesStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_LOAD_COVER_TYPES:
        CoverTypesStore.addItems(action.coverTypes)

        CoverTypesStore.emitChange()

        break;
      case Constants.ActionTypes.START_ADD_COVER_TYPE:
        CoverTypesStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_ADD_COVER_TYPE:
        CoverTypesStore.addItems(action.coverType)

        CoverTypesStore.emitChange()

        break;
      case Constants.ActionTypes.START_EDIT_COVER_TYPE:
        CoverTypesStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_EDIT_COVER_TYPE:
        CoverTypesStore.editItem(action.coverType)

        CoverTypesStore.emitChange()

        break;
      case Constants.ActionTypes.START_DELETE_COVER_TYPE:
        CoverTypesStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_DELETE_COVER_TYPE:
        CoverTypesStore.deleteItem(action.id)

        CoverTypesStore.emitChange()

        break;
    }
  })
});

export default CoverTypesStore;
