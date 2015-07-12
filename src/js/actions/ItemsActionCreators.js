import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import Itunes from '../apis/Itunes';

export default {
  loadItems(query, page) {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_LOAD_ITEMS
    });
    Itunes.search(query, page).then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_LOAD_ITEMS,
        items: response.results,
        page: page,
        searchString: query
      });
    })
  }
};
