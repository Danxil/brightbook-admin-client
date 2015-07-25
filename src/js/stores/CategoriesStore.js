import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';
import _ from 'underscore';

let _id = 'id'

let _model = []

function deleteCategory(id) {
  for (let i = 0; i < _model.length; i++) {
    if (_model[i][_id] == id)
      _model.splice(i, 1)
  }
}

function editCategory(category) {
  _.each(_model, function(item, index) {
    if (item[_id] == category[_id])
      _model[index] = category
  })
}

function addCategories(categories) {
  if (!_.isArray(categories))
    categories = [categories]

  for (let i = 0; i < categories.length; i++) {
    _.each(_model, function(item, index) {
      if (item[_id] == categories[i][_id])
        _model[index] = categories.splice(i, 1)[0]
    })
  }

  _model = _.union(_model, categories)
}

const CategoriesStore = assign({}, BaseStore, {
  getAll() {
    return _model;
  },

  getOne(id) {
    return _.find(_model, function(item) {
      return item[_id] == id
    })
  },

  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.START_LOAD_CATEGORIES:
        CategoriesStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_LOAD_CATEGORIES:
        addCategories(action.categories)

        CategoriesStore.emitChange()

        break;
      case Constants.ActionTypes.START_ADD_CATEGORY:
        CategoriesStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_ADD_CATEGORY:
        addCategories(action.category)

        CategoriesStore.emitChange()

        break;
      case Constants.ActionTypes.START_EDIT_CATEGORY:
        CategoriesStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_EDIT_CATEGORY:
        editCategory(action.category)

        CategoriesStore.emitChange()

        break;
      case Constants.ActionTypes.START_DELETE_CATEGORY:
        CategoriesStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_DELETE_CATEGORY:
        deleteCategory(action.id)

        CategoriesStore.emitChange()

        break;
    }
  })
});

export default CategoriesStore;
