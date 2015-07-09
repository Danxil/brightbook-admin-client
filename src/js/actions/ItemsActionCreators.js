import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import Itunes from '../apis/Itunes';

export default {
  loadItems(query) {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_LOAD_ITEMS
    });

    Itunes.search(query).then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_LOAD_ITEMS,
        items: response
      });
    })
  }
};
