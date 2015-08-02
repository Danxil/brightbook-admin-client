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
    let coverType = CoverTypesStore.getOne(coverTypeId)

    if (!coverType)
      CoverTypesActionCreators.loadCoverTypes(coverTypeId)

    obj.form = coverType
    obj.showDeleteModal = false

    if (coverType) {
      obj.datepicker.dateFirstEdition = coverType.dateFirstEdition ? Moment(coverType.dateFirstEdition) : null
    }
    return obj
  },

  _onChange() {
    this.setState(function(prev) {
      var coverType = CoverTypesStore.getOne(this.props.params.id)

      prev.form = coverType

      if (coverType) {
        prev.datepicker.dateFirstEdition = coverType.dateFirstEdition ? Moment(coverType.dateFirstEdition) : null
      }
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
    var fileForms = {
      image: this.refs.imagesForm.getDOMNode(),
      banner: this.refs.bannersForm.getDOMNode(),
      preview: this.refs.previewsForm.getDOMNode(),
    }

    CoverTypesActionCreators.editCoverType(this.props.params.id, this.state.form, fileForms).then(function() {
      this.transitionTo('coverTypes')
    }.bind(this))
  },

  delete() {
    this.toggleDeleteModal()

    CoverTypesActionCreators.deleteCoverType(this.props.params.id).then(function() {
      this.transitionTo('coverTypes')
    }.bind(this))
  },

  generateFieldsDOM(form, datepicker, fields) {
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
          <Button bsStyle='primary' onClick={this.submit}>Edit coverType</Button>
        </ButtonToolbar>
        <Button bsStyle='danger' className="pull-right" onClick={this.toggleDeleteModal}>Delete coverType</Button>



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
