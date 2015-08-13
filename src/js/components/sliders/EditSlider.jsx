import React from 'react';
import SlidersActionCreators from '../../actions/SlidersActionCreators.js';
import SlidersStore from '../../stores/SlidersStore.js';
import Constants from '../../Constants.js';
import {Button, Input, Modal, ButtonToolbar} from 'react-bootstrap';
import {Navigation, Link} from 'react-router';
import FieldsGenerator from '../../tools/FieldsGenerator.js';

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    var obj = {}

    let SliderId = this.props.params.id

    SlidersActionCreators.loadSliders(SliderId)

    obj.showDeleteModal = false

    return obj
  },

  _onChange() {
    this.setState(function(prev) {
      var Slider = SlidersStore.getOne(this.props.params.id)

      prev.form = Slider

      return prev
    })
  },

  componentDidMount() {
    SlidersStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    SlidersStore.removeChangeListener(this._onChange);
  },

  toggleDeleteModal() {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  },

  submit() {
    var data = this.state.form

    var fileForms = {
      photo: this.refs.SliderPhoto.getDOMNode(),
    }

    SlidersActionCreators.editSlider(this.props.params.id, data, fileForms).then(function() {
      this.transitionTo('Sliders')
    }.bind(this))
  },

  delete() {
    this.toggleDeleteModal()

    SlidersActionCreators.deleteSlider(this.props.params.id).then(function() {
      this.transitionTo('Sliders')
    }.bind(this))
  },

  render() {
    let {form} = this.state

    if (!form)
      return(<div></div>)

    var fields = [
      {
        type: 'text',
        label: 'Enter slider name',
        name: 'name',
      },
      {
        type: 'text',
        label: 'Enter slider title',
        name: 'title',
      },
      {
        type: 'uploadImage',
        name: 'SliderSlide',
        fieldName: 'slides',
        help: 'Chose slider slide',
        label: 'Slider slide',
        images: form.slides,
        multiple: true
      },
    ]

    return (
      <div>
        <div className="form-group clearfix">
          <h2>
            Edit Slider
          </h2>
        </div>
        {FieldsGenerator.call(this, this.state, fields)}
        <hr/>
        <ButtonToolbar className="pull-left">
          <Button bsStyle='primary' onClick={this.submit}>Edit Slider</Button>
        </ButtonToolbar>
        <Button bsStyle='danger' className="pull-right" onClick={this.toggleDeleteModal}>Delete Slider</Button>



        <Modal show={this.state.showDeleteModal} onHide={this.toggleDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure want to delete this Slider?</Modal.Title>
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
