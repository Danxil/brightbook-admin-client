import React from 'react';
import BooksActionCreators from '../../actions/BooksActionCreators.js';
import BooksStore from '../../stores/BooksStore.js';
import CategoriesActionCreators from '../../actions/CategoriesActionCreators.js';
import CategoriesStore from '../../stores/CategoriesStore';
import RubricsActionCreators from '../../actions/RubricsActionCreators.js';
import RubricsStore from '../../stores/RubricsStore.js';
import CoverTypesActionCreators from '../../actions/CoverTypesActionCreators.js';
import CoverTypesStore from '../../stores/CoverTypesStore.js';
import AuthorsActionCreators from '../../actions/AuthorsActionCreators.js';
import AuthorsStore from '../../stores/AuthorsStore.js';
import UploadImage from './../helpers/UploadImage.jsx';
import UploadFile from './../helpers/UploadFile.jsx';
import Constants from '../../Constants.js';
import {Button, Input, Modal, ButtonToolbar} from 'react-bootstrap';
import {Navigation, Link} from 'react-router';
import Datepicker from './../helpers/Datepicker.jsx';
import Moment from 'moment';
import _ from 'underscore';

export default React.createClass({
  mixins: [Navigation],

  componentDidMount() {
    BooksStore.addChangeListener(this._onChange);
    RubricsStore.addChangeListener(this._onChange);
    CategoriesStore.addChangeListener(this._onChange);
    CoverTypesStore.addChangeListener(this._onChange);
    AuthorsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    BooksStore.addChangeListener(this._onChange);
    RubricsStore.removeChangeListener(this._onChange);
    CategoriesStore.removeChangeListener(this._onChange);
    CoverTypesStore.removeChangeListener(this._onChange);
    AuthorsStore.removeChangeListener(this._onChange);
  },

  getInitialState() {
    var obj = {}

    let bookId = this.props.params.id

    BooksActionCreators.loadBooks(bookId)
    CategoriesActionCreators.loadCategories()
    RubricsActionCreators.loadRubrics()
    CoverTypesActionCreators.loadCoverTypes()
    AuthorsActionCreators.loadAuthors()

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
      prev.authors = AuthorsStore.getAll()

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

  generateFieldsDOM(form, datepicker, selects, fields) {
    function valueChange(fieldName) {
      this.setState(function(prev) {
        prev.form[fieldName] = this.refs[fieldName].getValue()

        return prev
      })
    }


    function multipleSelectChange(fieldName) {
      this.setState(function(prev) {
        prev.selects[fieldName] = this.refs[fieldName].getValue()

        return prev
      })
    }

    function selectChange(fieldName) {
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
        prev.form[fieldName].forEach(function(item, index) {
          if (item && item.id == id)
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

        case 'textarea':
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
              value={form[field.name] ? form[field.name].id : null}
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
              onChange={multipleSelectChange.bind(this, field.name)}>
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
            images={field.images}
            help={field.help}
            onDeleteImg={deleteFile.bind(this)}
            fieldName={field.fieldName}
            multiple={field.multiple}
            label={field.label} />)
          break
        case 'uploadFile':
          return (<UploadFile
            ref={field.name}
            files={field.files}
            help={field.help}
            onDeleteFile={deleteFile.bind(this)}
            fieldName={field.fieldName}
            multiple={field.multiple}
            label={field.label} />)
          break
      }
    }.bind(this))
  },

  render() {
    let {form, categories, coverTypes, rubrics, authors, selects, datepicker} = this.state

    if (!form || !categories || !rubrics || !coverTypes || !authors)
      return(<div></div>)

    var fields = [
      {
        type: 'text',
        label: 'Enter book name',
        name: 'name',
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
        {this.generateFieldsDOM(form, datepicker, selects, fields)}
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
