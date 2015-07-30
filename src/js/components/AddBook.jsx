import React from 'react';
import BooksActionCreators from '../actions/BooksActionCreators.js';
import BooksStore from '../stores/BooksStore.js';
import {Button, Input} from 'react-bootstrap';
import {Navigation} from 'react-router';
import UploadImage from './helpers/UploadImage.jsx';
import Datepicker from './helpers/Datepicker.jsx';
import Constants from '../Constants.js';

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    return {
      form: {
        name: '',
      },
      datepicker: {}
    }
  },

  _onChange() {
    this.setState(function(prev) {
      return prev
    })
  },

  componentDidMount() {
    //CategoriesStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    //CategoriesStore.removeChangeListener(this._onChange);
  },

  submit() {
    var data = this.state.form
    var imageForm = this.refs.imagesForm.getDOMNode()

    BooksActionCreators.addBook(data, imageForm).then(function() {
      this.transitionTo('books')
    }.bind(this))
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
        console.log(prev)
        prev.datepicker[fieldName] = date
        prev.form[fieldName] = date.format(Constants.ConfigSources.DATE_FORMAT)
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
            help={field.help}
            fieldName={field.fieldName}
            label={field.label} />)
          break
      }
    }.bind(this))
  },

  render() {
    var {form, datepicker} = this.state

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
      },
    ]

    return (
      <div>
        <h2>Add new book</h2>
        {this.generateFieldsDOM(form, datepicker, fields)}
        <hr/>
        <Button bsStyle='primary' onClick={this.submit}>Add book</Button>
      </div>
    );
  }
});
