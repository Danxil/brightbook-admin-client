import React from 'react';
import BooksActionCreators from '../../actions/BooksActionCreators.js';
import BooksStore from '../../stores/BooksStore.js';
import CategoriesActionCreators from '../../actions/CategoriesActionCreators.js';
import CategoriesStore from '../../stores/CategoriesStore';
import RubricsActionCreators from '../../actions/RubricsActionCreators.js';
import RubricsStore from '../../stores/RubricsStore.js';
import CoverTypesActionCreators from '../../actions/CoverTypesActionCreators.js';
import CoverTypesStore from '../../stores/CoverTypesStore.js';
import FormatsActionCreators from '../../actions/FormatsActionCreators.js';
import FormatsStore from '../../stores/FormatsStore.js';
import AuthorsActionCreators from '../../actions/AuthorsActionCreators.js';
import AuthorsStore from '../../stores/AuthorsStore.js';
import FormSideSchemasActionCreators from '../../actions/FormSideSchemasActionCreator.js';
import FormSideSchemasStore from '../../stores/FormSideSchemasStore.js';
import {Button, Input} from 'react-bootstrap';
import {Navigation} from 'react-router';
import Constants from '../../Constants.js';
import FieldsGenerator from '../../tools/FieldsGenerator.js';

export default React.createClass({
  mixins: [Navigation],

  componentDidMount() {
    CategoriesStore.addChangeListener(this._onChange);
    CoverTypesStore.addChangeListener(this._onChange);
    FormatsStore.addChangeListener(this._onChange);
    RubricsStore.addChangeListener(this._onChange);
    AuthorsStore.addChangeListener(this._onChange);
    FormSideSchemasStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    CategoriesStore.removeChangeListener(this._onChange);
    CoverTypesStore.removeChangeListener(this._onChange);
    FormatsStore.removeChangeListener(this._onChange);
    RubricsStore.removeChangeListener(this._onChange);
    AuthorsStore.removeChangeListener(this._onChange);
    FormSideSchemasStore.removeChangeListener(this._onChange);
  },

  getInitialState() {
    CategoriesActionCreators.loadCategories()
    RubricsActionCreators.loadRubrics()
    CoverTypesActionCreators.loadCoverTypes()
    FormatsActionCreators.loadFormats()
    AuthorsActionCreators.loadAuthors()
    FormSideSchemasActionCreators.loadFormSideSchemas()

    return {
      form: {},
      datepicker: {},
      selects: {
        categories: [],
        rubrics: [],
        authors: [],
      }
    }
  },

  _onChange() {
    this.setState(function(prev) {
      prev.categories = CategoriesStore.getAll()
      prev.rubrics = RubricsStore.getAll()
      prev.coverTypes = CoverTypesStore.getAll()
      prev.formats = FormatsStore.getAll()
      prev.authors = AuthorsStore.getAll()
      prev.formSideSchemas = FormSideSchemasStore.getAll()

      return prev
    })
  },

  submit() {
    var data = this.state.form

    var fileForms = {
      image: this.refs.imagesForm.getDOMNode(),
      banner: this.refs.bannersForm.getDOMNode(),
      preview: this.refs.previewsForm.getDOMNode(),
      epubLink: this.refs.epubForm.getDOMNode(),
      pdfLink: this.refs.pdfForm.getDOMNode(),
    }

    var selects = {
      categories: this.refs.categories.getValue(),
      rubrics: this.refs.rubrics.getValue(),
      authors: this.refs.authors.getValue(),
    }

    BooksActionCreators.addBook(data, selects, fileForms).then(function(result) {
      this.transitionTo('edit-book-reviews', {id: result.id}, {addingBook: true})
    }.bind(this))
  },

  render() {
    var {form, categories, rubrics, coverTypes, formats, formSideSchemas, authors, selects, datepicker} = this.state

    if (!categories || !rubrics || !coverTypes || !authors || !formSideSchemas)
      return(<div></div>)

    var fields = [
      {
        type: 'text',
        label: 'Enter book name',
        name: 'name',
      },
      {
        type: 'text',
        label: 'Enter ISBN',
        name: 'isbn',
      },
      {
        type: 'select',
        label: 'Choose author',
        name: 'authors',
        options: authors,
        optionLabelField: 'name',
        multiple: true
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
        type: 'select',
        label: 'Choose rubric',
        name: 'rubrics',
        options: rubrics,
        optionLabelField: 'name',
        multiple: true
      },
      {
        type: 'select',
        label: 'Choose format',
        name: 'format',
        options: formats,
        optionLabelField: 'name',
      },
      {
        type: 'select',
        label: 'Choose cover type',
        name: 'coverType',
        options: coverTypes,
        optionLabelField: 'name',
      },
      {
        type: 'textarea',
        label: 'About book',
        name: 'about',
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
        type: 'select',
        label: 'Choose form side',
        name: 'formSideSchema',
        options: formSideSchemas,
        optionLabelField: 'side',
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
      },
      {
        type: 'uploadFile',
        name: 'epubForm',
        fieldName: 'epubLinks',
        help: 'Chose epub book',
        label: 'Epub book upload',
      },
      {
        type: 'uploadFile',
        name: 'pdfForm',
        fieldName: 'pdfLinks',
        help: 'Chose pdf book',
        label: 'Pdf book upload',
      },
    ]

    return (
      <div>
        <h2>Add new book</h2>
        {FieldsGenerator.call(this, this.state, fields)}
        <hr/>
        <Button bsStyle='primary' onClick={this.submit}>Add book</Button>
      </div>
    );
  }
});
