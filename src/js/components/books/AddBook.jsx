import React from 'react';
import BooksActionCreators from '../../actions/BooksActionCreators.js';
import BooksStore from '../../stores/BooksStore.js';
import CategoriesActionCreators from '../../actions/CategoriesActionCreators.js';
import CategoriesStore from '../../stores/CategoriesStore';
import {Button, Input} from 'react-bootstrap';
import {Navigation} from 'react-router';
import UploadImage from './../helpers/UploadImage.jsx';
import Datepicker from './../helpers/Datepicker.jsx';
import Constants from '../../Constants.js';

export default React.createClass({
  mixins: [Navigation],

  componentDidMount() {
    CategoriesStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    CategoriesStore.removeChangeListener(this._onChange);
  },

  getInitialState() {
    CategoriesActionCreators.loadCategories()

    return {
      form: {},
      datepicker: {},
      selects: {
        categories: []
      }
    }
  },

  _onChange() {
    this.setState(function(prev) {
      prev.categories = CategoriesStore.getAll()

      return prev
    })
  },

  submit() {
    var data = this.state.form

    var fileForms = {
      image: this.refs.imagesForm.getDOMNode(),
      banner: this.refs.bannersForm.getDOMNode(),
      preview: this.refs.previewsForm.getDOMNode(),
    }

    var selects = {
      categories: this.refs.categories.getValue(),
    }

    BooksActionCreators.addBook(data, selects, fileForms).then(function(result) {
      this.transitionTo('edit-book-reviews', {id: result.id}, {addingBook: true})
    }.bind(this))
  },

  generateFieldsDOM(form, datepicker, selects, fields) {
    function valueChange(fieldName) {
      this.setState(function(prev) {
        prev.form[fieldName] = this.refs[fieldName].getValue()

        return prev
      })
    }

    function selectChange(fieldName) {
      this.setState(function(prev) {
        prev.selects[fieldName] = this.refs[fieldName].getValue()

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

        case 'select':
          if (!field.multiple)
            return (<Input
              type={field.type}
              value={selects[field.name]}
              label={field.label}
              ref={field.name}
              onChange={selectChange.bind(this, field.name)}>
              {field.options.map((option)=> <option value={option.id}>{option[field.optionLabelField]}</option>)}
            </Input>)
          else
            return (<Input
              type={field.type}
              value={selects[field.name]}
              label={field.label}
              ref={field.name}
              multiple
              onChange={selectChange.bind(this, field.name)}>
              {field.options.map((option)=> <option value={option.id}>{option[field.optionLabelField]}</option>)}
            </Input>)
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
            multiple={field.multiple}
            label={field.label} />)
          break
      }
    }.bind(this))
  },

  render() {
    var {form, categories, selects, datepicker} = this.state

    var fields = [
      {
        type: 'text',
        label: 'Enter book name',
        name: 'name',
      },
      {
        type: 'select',
        label: 'Choose category',
        name: 'categories',
        options: categories,
        optionLabelField: 'name',
        multiple: true
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
      {
        type: 'uploadImage',
        name: 'bannersForm',
        fieldName: 'banners',
        help: 'Chose book banner',
        label: 'Book banner',
        images: form.banners,
      },
      {
        type: 'uploadImage',
        name: 'previewsForm',
        fieldName: 'previews',
        help: 'Chose book previews',
        label: 'Book previews',
        images: form.previews,
        multiple: true
      }
    ]

    if (!categories)
      return(<div></div>)

    return (
      <div>
        <h2>Add new book</h2>
        {this.generateFieldsDOM(form, datepicker, selects, fields)}
        <hr/>
        <Button bsStyle='primary' onClick={this.submit}>Add book</Button>
      </div>
    );
  }
});
