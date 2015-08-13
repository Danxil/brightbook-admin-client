import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import rest from '../api/rest.js';
import ContactsStore from '../stores/ContactsStore.js';
import vow from 'vow'
import _ from 'underscore'

export default {
  loadContacts(id) {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_LOAD_CONTACTS
    })

    return rest.getContacts(id).then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_LOAD_CONTACTS,
        contacts: response.data
      });
    })
  },


  editContact(id, data) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_EDIT_CONTACT
    })

    var fields = {
      emails: 'email',
      phones: 'phone',
      postAddresses: 'postAddress',
    }

    var deffArr = []

    _.each(fields, function(model, field) {
      data[field].forEach(function(item) {
        if (item.delete)
          deffArr.push(rest.deleteContactField(item.id, model))
        else if (!item.id) {
          var promise = rest.addContactField(model, item).then(function(result) {
            return rest.associateContactAndContactField(id, field, result.data.id)
          })

          deffArr.push(promise)
        }
        else
          rest.editContactField(item.id, model, item)
      })
    })

    vow.all(deffArr).then(function(response) {
      def.resolve()
    })

    return def.promise()
  },
};
