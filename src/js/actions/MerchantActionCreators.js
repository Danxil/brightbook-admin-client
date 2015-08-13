import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import rest from '../api/rest.js';
import MerchantStore from '../stores/MerchantStore.js';
import vow from 'vow'
import _ from 'underscore'

export default {
  loadMerchant() {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_LOAD_MERCHANT
    })

    return rest.getMerchant().then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_LOAD_MERCHANT,
        merchant: response.data
      });
    })
  },


  editMerchant(data) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_EDIT_MERCHANT
    })

    rest.editMerchant(data).then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_EDIT_MERCHANT,
        merchant: response.data
      });

      def.resolve()
    })

    return def.promise()
  },
};
