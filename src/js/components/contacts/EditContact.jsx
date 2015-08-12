import React from 'react';
import ContactsActionCreators from '../../actions/ContactsActionCreators.js';
import ContactsStore from '../../stores/ContactsStore.js';
import Constants from '../../Constants.js';
import {Button, Input, Modal, ButtonToolbar} from 'react-bootstrap';
import {Navigation, Link} from 'react-router';
import FieldsGenerator from '../../tools/FieldsGenerator.js';

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    var obj = {}

    let contactId = this.props.params.id

    ContactsActionCreators.loadContacts(contactId)

    obj.deleteFields = {
      emails: [],
      phones: [],
      postAddress: [],
    }

    obj.newFields = {
      emails: [],
      phones: [],
      postAddress: [],
    }

    return obj
  },

  _onChange() {
    this.setState(function(prev) {
      var contact = ContactsStore.getOne(this.props.params.id)

      prev.form = contact

      return prev
    })
  },

  componentDidMount() {
    ContactsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    ContactsStore.removeChangeListener(this._onChange);
  },

  submit() {
    ContactsActionCreators.editContact(this.props.params.id, this.state.form).then(function() {
      this.transitionTo('contacts')
    }.bind(this))
  },

  render() {
    let {form, deleteFields, newFields} = this.state

    if (!form)
      return(<div></div>)

    var fields = [
      {
        type: 'text',
        label: 'Emails',
        name: 'email',
        array: 'emails',
        newArray: newFields,
        deleteArray: deleteFields,
      }
    ]

    return (
      <div>
        <div className="form-group clearfix">
          <h2>
            {form.name}
          </h2>
        </div>
        {FieldsGenerator.call(this, this.state, fields)}
        <hr/>
        <ButtonToolbar className="pull-left">
          <Button bsStyle='primary' onClick={this.submit}>Edit contact</Button>
        </ButtonToolbar>

      </div>
    );
  }
});
