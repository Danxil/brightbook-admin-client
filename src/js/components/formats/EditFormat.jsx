import React from 'react';
import FormatsActionCreators from '../../actions/FormatsActionCreators.js';
import FormatsStore from '../../stores/FormatsStore.js';
import Constants from '../../Constants.js';
import {Button, Input, Modal, ButtonToolbar} from 'react-bootstrap';
import {Navigation, Link} from 'react-router';
import FieldsGenerator from '../../tools/FieldsGenerator.js';

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    var obj = {}

    let formatId = this.props.params.id

    FormatsActionCreators.loadFormats(formatId)

    obj.showDeleteModal = false

    return obj
  },

  _onChange() {
    this.setState(function(prev) {
      var format = FormatsStore.getOne(this.props.params.id)

      prev.form = format

      return prev
    })
  },

  componentDidMount() {
    FormatsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    FormatsStore.removeChangeListener(this._onChange);
  },

  toggleDeleteModal() {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  },

  submit() {
    FormatsActionCreators.editFormat(this.props.params.id, this.state.form).then(function() {
      this.transitionTo('formats')
    }.bind(this))
  },

  delete() {
    this.toggleDeleteModal()

    FormatsActionCreators.deleteFormat(this.props.params.id).then(function() {
      this.transitionTo('formats')
    }.bind(this))
  },

  render() {
    let {form} = this.state

    if (!form)
      return(<div></div>)

    var fields = [
      {
        type: 'text',
        label: 'Enter format',
        name: 'name',
      }
    ]

    return (
      <div>
        <div className="form-group clearfix">
          <h2>
            Edit format
          </h2>
        </div>
        {FieldsGenerator.call(this, this.state, fields)}
        <hr/>
        <ButtonToolbar className="pull-left">
          <Button bsStyle='primary' onClick={this.submit}>Edit format</Button>
        </ButtonToolbar>
        <Button bsStyle='danger' className="pull-right" onClick={this.toggleDeleteModal}>Delete format</Button>



        <Modal show={this.state.showDeleteModal} onHide={this.toggleDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure want to delete this format?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{form.name}</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.delete}>Delete</Button>
            <Button bsStyle="primary" onClick={this.toggleDeleteModal}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});
