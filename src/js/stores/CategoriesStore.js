import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

const CategoriesStore = assign({}, BaseStore, {
  _id: 'id',

  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.START_LOAD_CATEGORIES:
        CategoriesStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_LOAD_CATEGORIES:
        CategoriesStore.addItems(action.categories)

        CategoriesStore.emitChange()

        break;
      case Constants.ActionTypes.START_ADD_CATEGORY:
        CategoriesStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_ADD_CATEGORY:
        CategoriesStore.addItems(action.category)

        CategoriesStore.emitChange()

        break;
      case Constants.ActionTypes.START_EDIT_CATEGORY:
        CategoriesStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_EDIT_CATEGORY:
        CategoriesStore.editItem(action.category)

        CategoriesStore.emitChange()

        break;
      case Constants.ActionTypes.START_DELETE_CATEGORY:
        CategoriesStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_DELETE_CATEGORY:
        CategoriesStore.deleteItem(action.id)

        CategoriesStore.emitChange()

        break;
    }
  })
});

export default CategoriesStore;
