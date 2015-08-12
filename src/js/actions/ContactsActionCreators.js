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

  addContactField(id, field, data) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_ADD_CONTACT
    })

    rest.addContactField(field, data).then(function(response) {
      rest.associateContactAndContactField(id, field, response.data.id).then(function(response) {

        Dispatcher.handleServerAction({
          type: Constants.ActionTypes.SUCCESS_ADD_CONTACT,
          contact: response.data
        });

        def.resolve()
      })
    })

    return def.promise()
  },

  editContactField(id, field, data) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_EDIT_CONTACT
    })

    rest.editContactField(id, field, data).then(function(result) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_EDIT_CONTACT,
        contact: result.data
      });

      def.resolve()
    })

    return def.promise()
  },

  deleteContactField(id, field) {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_DELETE_CONTACT
    })

    return rest.deleteContactField(id, field).then(function() {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_DELETE_CONTACT,
        id: id
      });
    })
  },
};
