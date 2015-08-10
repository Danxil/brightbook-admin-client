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
import Constants from '../../Constants.js';
import {Button, Modal, ButtonToolbar} from 'react-bootstrap';
import {Navigation, Link} from 'react-router';
import Moment from 'moment';
import _ from 'underscore';
import FieldsGenerator from '../../tools/FieldsGenerator.js';


export default React.createClass({
  mixins: [Navigation],

  componentDidMount() {
    BooksStore.addChangeListener(this._onChange);
    RubricsStore.addChangeListener(this._onChange);
    CategoriesStore.addChangeListener(this._onChange);
    CoverTypesStore.addChangeListener(this._onChange);
    FormatsStore.addChangeListener(this._onChange);
    AuthorsStore.addChangeListener(this._onChange);
    FormSideSchemasStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    BooksStore.addChangeListener(this._onChange);
    RubricsStore.removeChangeListener(this._onChange);
    CategoriesStore.removeChangeListener(this._onChange);
    CoverTypesStore.removeChangeListener(this._onChange);
    FormatsStore.removeChangeListener(this._onChange);
    AuthorsStore.removeChangeListener(this._onChange);
    FormSideSchemasStore.removeChangeListener(this._onChange);
  },

  getInitialState() {
    var obj = {}

    let bookId = this.props.params.id

    BooksActionCreators.loadBooks(bookId)
    CategoriesActionCreators.loadCategories()
    RubricsActionCreators.loadRubrics()
    CoverTypesActionCreators.loadCoverTypes()
    FormatsActionCreators.loadFormats()
    AuthorsActionCreators.loadAuthors()
    FormSideSchemasActionCreators.loadFormSideSchemas()

    obj.datepicker = {}
    obj.selects = {}
    obj.showDeleteModal = false

    return obj
  },

  _onChange() {
    this.setState(function(prev) {
      prev.form = BooksStore.getOne(this.props.params.id)
      prev.categories = CategoriesStore.getAll()
      prev.rubrics = RubricsStore.getAll()
      prev.coverTypes = CoverTypesStore.getAll()
      prev.formats = FormatsStore.getAll()
      prev.authors = AuthorsStore.getAll()
      prev.formSideSchemas = FormSideSchemasStore.getAll()

      if (prev.form) {
        prev.datepicker.dateFirstEdition = prev.form.dateFirstEdition ? Moment(prev.form.dateFirstEdition) : null
        prev.selects.categories = _.map(prev.form.categories, (item=> item.id))
        prev.selects.rubrics = _.map(prev.form.rubrics, (item=> item.id))
        prev.selects.authors = _.map(prev.form.authors, (item=> item.id))
      }

      return prev
    })
  },

  toggleDeleteModal() {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  },

  submit() {
    var fileForms = {
      image: this.refs.imagesForm.getDOMNode(),
      banner: this.refs.bannersForm.getDOMNode(),
      singleBanner: this.refs.singleBannersForm.getDOMNode(),
      preview: this.refs.previewsForm.getDOMNode(),
      epubLink: this.refs.epubForm.getDOMNode(),
      pdfLink: this.refs.pdfForm.getDOMNode(),
    }

    var selects = {
      categories: this.refs.categories.getValue(),
      rubrics: this.refs.rubrics.getValue(),
      authors: this.refs.authors.getValue(),
    }

    BooksActionCreators.editBook(this.props.params.id, this.state.form, selects, fileForms).then(function() {
      this.transitionTo('books')
    }.bind(this))
  },

  delete() {
    this.toggleDeleteModal()

    BooksActionCreators.deleteBook(this.props.params.id).then(function() {
      this.transitionTo('books')
    }.bind(this))
  },

  render() {
    let {form, categories, coverTypes, formats, rubrics, authors, formSideSchemas, datepicker} = this.state

    if (!form)
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
        type: 'number',
        label: 'Enter book weight',
        name: 'weight',
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
        images: form.images,
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
        name: 'singleBannersForm',
        fieldName: 'singleBanners',
        help: 'Chose book banner for single page',
        label: 'Book banner for single page',
        images: form.singleBanners,
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
        files: form.epubLinks
      },
      {
        type: 'uploadFile',
        name: 'pdfForm',
        fieldName: 'pdfLinks',
        help: 'Chose pdf book',
        label: 'Pdf book upload',
        files: form.pdfLinks
      },
    ]

    return (
      <div>
        <div className="form-group clearfix">
          <h2>
            Edit book
            <ButtonToolbar className="pull-right">
              <Link className="btn btn-default" to="edit-book-reviews" params={{id: form.id}}>
                Edit comments
              </Link>
              <Link className="btn btn-default" to="edit-book-reasons" params={{id: form.id}}>
                Edit book reason
              </Link>
            </ButtonToolbar>
          </h2>
        </div>
        {FieldsGenerator.call(this, this.state, fields)}
        <hr/>
        <ButtonToolbar className="pull-left">
          <Button bsStyle='primary' onClick={this.submit}>Edit book</Button>
        </ButtonToolbar>
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
