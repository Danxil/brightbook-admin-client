import React from 'react';
import Contact from './Contact.jsx';
import ListGroup from '../../../../node_modules/react-bootstrap/lib/ListGroup';
import ContactsActionCreators from '../../actions/ContactsActionCreators.js';
import ContactsStore from '../../stores/ContactsStore.js';

export default React.createClass({
  getInitialState() {
    ContactsActionCreators.loadContacts()

    return {contacts: ContactsStore.getAll()}
  },

  createContactsDom(contacts) {
    return contacts.map(contact => <Contact contact={contact} />)
  },

  _onChange() {
    this.setState({contacts: ContactsStore.getAll()});
  },

  componentDidMount() {
    ContactsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    ContactsStore.removeChangeListener(this._onChange);
  },

  render() {
    let {contacts} = this.state;

    return (
      <ListGroup>
        {this.createContactsDom(contacts)}
      </ListGroup>
    );
  }
});
