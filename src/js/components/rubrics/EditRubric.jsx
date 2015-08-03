import React from 'react';
import RubricsActionCreators from '../../actions/RubricsActionCreators.js';
import RubricsStore from '../../stores/RubricsStore.js';
import Constants from '../../Constants.js';
import {Button, Input, Modal, ButtonToolbar} from 'react-bootstrap';
import {Navigation, Link} from 'react-router';
import Colorpicker from '../helpers/Colorpicker.jsx';

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    var obj = {}

    let rubricId = this.props.params.id

    RubricsActionCreators.loadRubrics(rubricId)

    obj.showDeleteModal = false

    return obj
  },

  _onChange() {
    this.setState(function(prev) {
      var rubric = RubricsStore.getOne(this.props.params.id)

      prev.form = rubric

      return prev
    })
  },

  componentDidMount() {
    RubricsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    RubricsStore.removeChangeListener(this._onChange);
  },

  toggleDeleteModal() {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  },

  submit() {
    RubricsActionCreators.editRubric(this.props.params.id, this.state.form).then(function() {
      this.transitionTo('rubrics')
    }.bind(this))
  },

  delete() {
    this.toggleDeleteModal()

    RubricsActionCreators.deleteRubric(this.props.params.id).then(function() {
      this.transitionTo('rubrics')
    }.bind(this))
  },

  generateFieldsDOM(form, fields) {
    function valueChange(fieldName) {
      this.setState(function(prev) {
        prev.form[fieldName] = this.refs[fieldName].getValue()

        return prev
      })
    }

    function colorChange(fieldName, color) {
      this.setState(function(prev) {
        prev.form[fieldName] = color.toHex()
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
        case 'colorPicker':
          return (<Colorpicker
            color={field.color}
            name={field.name}
            label={field.label}
            onChange={colorChange.bind(this, field.name)}/>)
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
        label: 'Enter rubric name',
        name: 'name',
      },
      {
        type: 'colorPicker',
        label: 'Choose rubric color',
        name: 'color',
        color: form.color
      }
    ]

    return (
      <div>
        <div className="form-group clearfix">
          <h2>
            Edit rubric
          </h2>
        </div>
        {this.generateFieldsDOM(form, fields)}
        <hr/>
        <ButtonToolbar className="pull-left">
          <Button bsStyle='primary' onClick={this.submit}>Edit rubric</Button>
        </ButtonToolbar>
        <Button bsStyle='danger' className="pull-right" onClick={this.toggleDeleteModal}>Delete rubric</Button>



        <Modal show={this.state.showDeleteModal} onHide={this.toggleDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure want to delete this rubric?</Modal.Title>
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
