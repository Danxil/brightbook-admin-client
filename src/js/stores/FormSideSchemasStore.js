import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import CollectionStore from './CollectionStore';
import assign from 'object-assign';

const FormSideSchemasStore = assign({}, CollectionStore, {
  _id: 'id',

  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.START_LOAD_FORM_SIDE_SCHEMAS:
        FormSideSchemasStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_LOAD_FORM_SIDE_SCHEMAS:
        FormSideSchemasStore.addItems(action.formSideSchemas)

        FormSideSchemasStore.emitChange()

        break;
    }
  })
});

export default FormSideSchemasStore;
