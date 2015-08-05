import React from 'react';
import CoverTypesActionCreators from '../../actions/CoverTypesActionCreators.js';
import CoverTypesStore from '../../stores/CoverTypesStore.js';
import Constants from '../../Constants.js';
import {Button, Input, Modal, ButtonToolbar} from 'react-bootstrap';
import {Navigation, Link} from 'react-router';

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    var obj = {}

    let coverTypeId = this.props.params.id

    CoverTypesActionCreators.loadCoverTypes(coverTypeId)

    obj.showDeleteModal = false

    return obj
  },

  _onChange() {
    this.setState(function(prev) {
      var coverType = CoverTypesStore.getOne(this.props.params.id)

      prev.form = coverType

      return prev
    })
  },

  componentDidMount() {
    CoverTypesStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    CoverTypesStore.removeChangeListener(this._onChange);
  },

  toggleDeleteModal() {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  },

  submit() {
    CoverTypesActionCreators.editCoverType(this.props.params.id, this.state.form).then(function() {
      this.transitionTo('cover-types')
    }.bind(this))
  },

  delete() {
    this.toggleDeleteModal()

    CoverTypesActionCreators.deleteCoverType(this.props.params.id).then(function() {
      this.transitionTo('cover-types')
    }.bind(this))
  },

  generateFieldsDOM(form, fields) {
    function valueChange(fieldName) {
      this.setState(function(prev) {
        prev.form[fieldName] = this.refs[fieldName].getValue()

        return prev
      })
    }


    return fields.map(function(field) {
      switch (field.type) {
        case 'text':
          return (<Input
            type={field.type}
            value={form[field.name]}
            label={field.label}
            ref={field.name}
            onChange={valueChange.bind(this, field.name)}/>)
          break
      }
    }.bind(this))
  },

  render() {
    let {form} = this.state

    if (!form)
      return(<div></div>)

    var fields = [
      {
        type: 'text',
        label: 'Enter cover type',
        name: 'name',
      }
    ]

    return (
      <div>
        <div className="form-group clearfix">
          <h2>
            Edit cover type
          </h2>
        </div>
        {this.generateFieldsDOM(form, fields)}
        <hr/>
        <ButtonToolbar className="pull-left">
          <Button bsStyle='primary' onClick={this.submit}>Edit cover type</Button>
        </ButtonToolbar>
        <Button bsStyle='danger' className="pull-right" onClick={this.toggleDeleteModal}>Delete cover type</Button>



        <Modal show={this.state.showDeleteModal} onHide={this.toggleDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure want to delete this cover type?</Modal.Title>
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
