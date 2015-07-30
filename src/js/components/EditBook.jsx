import React from 'react';
import BooksActionCreators from '../actions/BooksActionCreators.js';
import HeaderColorsActionCreators from '../actions/HeaderColorsActionCreators.js';
import BooksStore from '../stores/BooksStore.js';
import UploadImage from './helpers/UploadImage.jsx';
import Constants from '../Constants.js';
import {Button, Input, Modal} from 'react-bootstrap';
import {Navigation} from 'react-router';
import Datepicker from './helpers/Datepicker.jsx';
import Moment from 'moment';

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    var obj = {}

    let bookId = this.props.params.id
    let book = BooksStore.getOne(bookId)

    if (!book)
      BooksActionCreators.loadBooks(bookId)

    obj.form = book
    obj.datepicker = {}
    obj.showDeleteModal = false

    if (book) {
      obj.datepicker.dateFirstEdition = book.dateFirstEdition ? Moment(book.dateFirstEdition) : null
    }
    return obj
  },

  _onChange() {
    this.setState(function(prev) {
      var book = BooksStore.getOne(this.props.params.id)

      prev.form = book

      if (book) {
        prev.datepicker.dateFirstEdition = book.dateFirstEdition ? Moment(book.dateFirstEdition) : null
      }
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
    BooksActionCreators.editBook(this.props.params.id, this.state.form, this.refs.imagesForm.getDOMNode()).then(function() {
      this.transitionTo('books')
    }.bind(this))
  },

  delete() {
    this.toggleDeleteModal()

    BooksActionCreators.deleteBook(this.props.params.id).then(function() {
      this.transitionTo('books')
    }.bind(this))
  },

  valueChange(fieldName) {
    this.setState(function(prev) {
      prev.form[fieldName] = this.refs[fieldName].getValue()

      return prev
    })
  },

  dateChange(fieldName, date) {
    this.setState(function(prev) {
      prev.datepicker[fieldName] = date
      prev.form[fieldName] = date.format(Constants.ConfigSources.DATE_FORMAT)
      return prev
    })
  },

  generateFieldsDOM(form, datepicker, fields) {
    function valueChange(fieldName) {
      this.setState(function(prev) {
        prev.form[fieldName] = this.refs[fieldName].getValue()

        return prev
      })
    }

    function dateChange(fieldName, date) {
      this.setState(function(prev) {
        prev.datepicker[fieldName] = date
        prev.form[fieldName] = date.format(Constants.ConfigSources.DATE_FORMAT)
        return prev
      })
    }

    function deleteFile(id, fieldName) {
      this.setState(function(prev) {
        console.log(prev)
        prev.form[fieldName].forEach(function(item, index) {
          if (item.id == id)
            prev.form[fieldName][index].delete = true
        })

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

        case 'number':
          return (<Input
            type={field.type}
            min={field.min}
            value={form[field.name]}
            label={field.label}
            ref={field.name}
            onChange={valueChange.bind(this, field.name)}/>)
          break

        case 'datepicker':
          return (<Datepicker
            selected={datepicker[field.name]}
            fieldName={field.name}
            onChange={dateChange.bind(this)}
            label={field.label}/>)
          break
        case 'uploadImage':
          return (<UploadImage
            ref={field.name}
            image={field.image}
            help={field.help}
            onDeleteImg={deleteFile.bind(this)}
            fieldName={field.fieldName}
            label={field.label} />)
          break
      }
    }.bind(this))
  },

  render() {
    let {form, datepicker} = this.state

    if (!form)
      return(<div></div>)

    var fields = [
      {
        type: 'text',
        label: 'Enter book name',
        name: 'name',
      },
      {
        type: 'number',
        label: 'Enter electric book price',
        name: 'priceE',
        min: 0
      },
      {
        type: 'number',
        label: 'Enter analog book price',
        name: 'priceA',
        min: 0
      },
      {
        type: 'number',
        label: 'Enter recomend retail price',
        name: 'recommendRetailPrice',
        min: 0
      },
      {
        type: 'number',
        label: 'Enter book length',
        name: 'length',
        min: 0
      },
      {
        type: 'number',
        label: 'Enter reeditions count',
        name: 'countReeditions',
        min: 0
      },
      {
        type: 'datepicker',
        label: 'Date first edition',
        name: 'dateFirstEdition',
      },
      {
        type: 'uploadImage',
        name: 'imagesForm',
        fieldName: 'images',
        help: 'Chose book image',
        label: 'Book image',
        image: form.images[0]
      },
    ]

    return (
      <div>
        <h2>Edit book</h2>
        {this.generateFieldsDOM(form, datepicker, fields)}
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
