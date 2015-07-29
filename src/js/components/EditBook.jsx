import React from 'react';
import BooksActionCreators from '../actions/BooksActionCreators.js';
import HeaderColorsActionCreators from '../actions/HeaderColorsActionCreators.js';
import BooksStore from '../stores/BooksStore.js';
import UploadImage from './helpers/UploadImage.jsx';
import {Button, Input, Modal} from 'react-bootstrap';
import {Navigation} from 'react-router';

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    let bookId = this.props.params.id
    let book = BooksStore.getOne(bookId)

    if (!book)
      BooksActionCreators.loadBooks(bookId)

    return {
      form: book,
      showDeleteModal: false
    }
  },

  valueChange(fieldName) {
    this.setState(function(prev) {
      prev.form[fieldName] = this.refs[fieldName].getValue()

      return prev
    })
  },

  _onChange() {
    this.setState(function(prev) {
      prev.form = BooksStore.getOne(this.props.params.id)
      return prev
    })
  },

  componentDidMount() {
    BooksStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    BooksStore.removeChangeListener(this._onChange);
  },

  toggleDeleteModal() {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  },

  submit() {
    BooksActionCreators.editBook(this.props.params.id, this.state.form, this.refs.form.getDOMNode()).then(function() {
      this.transitionTo('books')
    }.bind(this))
  },

  delete() {
    this.toggleDeleteModal()

    BooksActionCreators.deleteBook(this.props.params.id).then(function() {
      this.transitionTo('books')
    }.bind(this))
  },

  deleteFile(id, fieldName) {
    this.setState(function(prev) {
      prev.form[fieldName].forEach(function(item, index) {
        if (item.id == id)
          prev.form[fieldName][index].delete = true
      })

      return prev
    })
  },

  render() {
    let {form} = this.state

    if (!form)
      return(<div></div>)

    return (
      <div>
        <h2>Edit book</h2>
        <Input
          type='text'
          value={form.name}
          label='Enter book name'
          ref="name"
          onChange={this.valueChange.bind(this, 'name')} />
        <Input
          type='number'
          value={form.priceE}
          label='Enter electric book price'
          ref="priceE"
          onChange={this.valueChange.bind(this, 'priceE')} />
        <Input
          type='number'
          value={form.priceA}
          label='Enter analog book price'
          ref="priceA"
          onChange={this.valueChange.bind(this, 'priceA')} />
        <Input
          type='number'
          value={form.recommendRetailPrice}
          label='Enter recomend retail price'
          ref="recommendRetailPrice"
          onChange={this.valueChange.bind(this, 'recommendRetailPrice')} />
        <Input
          type='number'
          value={form.length}
          label='Enter book length'
          ref="length"
          onChange={this.valueChange.bind(this, 'length')} />
        <Input
          type='number'
          value={form.countReeditions}
          label='Enter reeditions count'
          ref="countReeditions"
          onChange={this.valueChange.bind(this, 'countReeditions')} />
        <UploadImage ref="form" onDeleteImg={this.deleteFile} fieldName="images" image={form.images[0]} help="Chose book image" label="Book image" />
        <hr/>
        <Button bsStyle='primary' onClick={this.submit}>Edit book</Button>
        <Button bsStyle='danger' className="pull-right" onClick={this.toggleDeleteModal}>Delete book</Button>



        <Modal show={this.state.showDeleteModal} onHide={this.toggleDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure want to delete this book?</Modal.Title>
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
