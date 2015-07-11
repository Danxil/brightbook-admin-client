import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import Itunes from '../apis/Itunes';

export default {
  loadItems(query) {
    console.log('start: ' + Constants.ActionTypes.START_LOAD_ITEMS)
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_LOAD_ITEMS
    });

    Itunes.search(query).then(function(response) {
      console.log('start: ' + Constants.ActionTypes.SUCCESS_LOAD_ITEMS)
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_LOAD_ITEMS,
        items: response.results
      });
    })
  }
};
