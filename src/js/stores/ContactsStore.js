import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import CollectionStore from './CollectionStore';
import assign from 'object-assign';

const ContactsStore = assign({}, CollectionStore, {
  _id: 'id',

  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.START_LOAD_CONTACTS:
        ContactsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_LOAD_CONTACTS:
        ContactsStore.addItems(action.contacts)

        ContactsStore.emitChange()

        break;
      case Constants.ActionTypes.START_ADD_CONTACT:
        ContactsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_ADD_CONTACT:
        ContactsStore.addItems(action.contacts)

        ContactsStore.emitChange()

        break;
      case Constants.ActionTypes.START_EDIT_CONTACT:
        ContactsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_EDIT_CONTACT:
        ContactsStore.editItem(action.contact)

        ContactsStore.emitChange()

        break;
      case Constants.ActionTypes.START_DELETE_CONTACT:
        ContactsStore.emitChange()

        break;
      case Constants.ActionTypes.SUCCESS_DELETE_CONTACT:
        ContactsStore.deleteItem(action.id)

        ContactsStore.emitChange()

        break;
    }
  })
});

export default ContactsStore;
