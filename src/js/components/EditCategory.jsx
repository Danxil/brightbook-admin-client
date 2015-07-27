import React from 'react';
import CategoriesActionCreators from '../actions/CategoriesActionCreators.js';
import HeaderColorsActionCreators from '../actions/HeaderColorsActionCreators.js';
import CategoriesStore from '../stores/CategoriesStore';
import HeaderColorsStore from '../stores/HeaderColorsStore';
import {Button, Input, Modal} from 'react-bootstrap';
import {Navigation} from 'react-router';

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    let categoryId = this.props.params.id
    let category = CategoriesStore.getOne(categoryId)

    HeaderColorsActionCreators.loadHeaderColors()

    if (!category)
      CategoriesActionCreators.loadCategories(categoryId)

    return {
      form: category,
      showDeleteModal: false
    }
  },

  nameChange() {
    this.setState(function(prev) {
      prev.form.name = this.refs.name.getValue()

      return prev
    })
  },

  headerColorChange() {
    this.setState(function(previousState) {
      previousState.form.headerColor = this.refs.headerColor.getValue()
      return previousState
    })
  },

  _onChange() {
    this.setState(function(prev) {
      let obj = {
        form: CategoriesStore.getOne(this.props.params.id),
        headerColors: HeaderColorsStore.getAll()
      }

      if (obj.form && !!obj.form.headerColor.id)
        obj.form.headerColor = obj.form.headerColor.id

      return obj
    })
  },

  componentDidMount() {
    CategoriesStore.addChangeListener(this._onChange);
    HeaderColorsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    CategoriesStore.removeChangeListener(this._onChange);
    HeaderColorsStore.removeChangeListener(this._onChange);
  },

  toggleDeleteModal() {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  },

  submit() {
    CategoriesActionCreators.editCategory(this.props.params.id, this.state.form).then(function() {
      this.transitionTo('categories')
    }.bind(this))
  },

  delete() {
    this.toggleDeleteModal()

    CategoriesActionCreators.deleteCategory(this.props.params.id).then(function() {
      this.transitionTo('categories')
    }.bind(this))
  },

  render() {
    let {form, headerColors} = this.state

    if (!form || !headerColors)
      return(<div></div>)

    let headerColorsDOM = headerColors.map(item => <option value={item.id}>{item.color}</option>)

    return (
      <div>
        <h2>Edit category</h2>
        <Input
          type='text'
          value={form.name}
          label='Enter category name'
          ref='name'
          onChange={this.nameChange} />
        <Input type='select' value={form.headerColor} onChange={this.headerColorChange} ref='headerColor' label='Header font color'>
          {headerColorsDOM}
        </Input>
        <Button bsStyle='primary' onClick={this.submit}>Edit category</Button>
        <Button bsStyle='danger' className="pull-right" onClick={this.toggleDeleteModal}>Delete category</Button>



        <Modal show={this.state.showDeleteModal} onHide={this.toggleDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure want to delete this category?</Modal.Title>
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
