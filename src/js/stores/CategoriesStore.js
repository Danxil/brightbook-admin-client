import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';
import _ from 'underscore';

let _id = 'id'

let _model = {
  categories: [],
  loading: false
}

function addCategories(categories) {
  if (!_.isArray(categories))
    categories = [categories]

  for (let i = 0; i < categories.length; i++) {
    let findCondition = {}
    findCondition[_id] = categories[i][_id]

    let itemExist = _.findWhere(_model.categories, findCondition)

    if (itemExist) {
      itemExist = categories.splice(i, 1)
      i--
    }
  }

  _model.categories = _.union(_model.categories, categories)
}

const CategoriesStore = assign({}, BaseStore, {
  getAll() {
    return _model;
  },

  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.START_LOAD_CATEGORIES:
        _model.loading = true

        CategoriesStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_LOAD_CATEGORIES:
        _model.loading = false
        addCategories(action.categories)

        CategoriesStore.emitChange()

        break;
    }
  })
});

export default CategoriesStore;
