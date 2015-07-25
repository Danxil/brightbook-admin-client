import React from 'react';
import CategoriesActionCreators from '../actions/CategoriesActionCreators.js';
import CategoriesStore from '../stores/CategoriesStore';
import {Button, Input, Modal} from 'react-bootstrap';
import {Navigation} from 'react-router';

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    let categoryId = this.props.params.id
    let category = CategoriesStore.getOne(categoryId)

    if (!category)
      CategoriesActionCreators.loadCategories(categoryId)

    return {
      form: category,
      showDeleteModal: false
    }
  },

  handleChange() {
    this.setState({form: {name: this.refs.name.getValue()}})
  },

  _onChange() {
    this.setState({form: CategoriesStore.getOne(this.props.params.id)});
  },

  componentDidMount() {
    CategoriesStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    CategoriesStore.removeChangeListener(this._onChange);
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
    let {form} = this.state

    if (!form)
      return(<div></div>)
    else
      return (
        <div>
          <h2>Edit category</h2>
          <Input
            type='text'
            value={form.name}
            label='Enter category name'
            ref='name'
            onChange={this.handleChange} />
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
