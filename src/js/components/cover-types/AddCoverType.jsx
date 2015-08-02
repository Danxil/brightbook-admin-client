import React from 'react';
import CoverTypesActionCreators from '../../actions/CoverTypesActionCreators.js';
import CoverTypesStore from '../../stores/CoverTypesStore.js';
import {Button, Input} from 'react-bootstrap';
import {Navigation} from 'react-router';
import UploadImage from './../helpers/UploadImage.jsx';
import Datepicker from './../helpers/Datepicker.jsx';
import Constants from '../../Constants.js';

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

  submit() {
    var data = this.state.form

    var fileForms = {
      image: this.refs.imagesForm.getDOMNode(),
      banner: this.refs.bannersForm.getDOMNode(),
      preview: this.refs.previewsForm.getDOMNode(),
    }

    CoverTypesActionCreators.addCoverType(data, fileForms).then(function(result) {
      this.transitionTo('edit-coverType-reviews', {id: result.id}, {addingCoverType: true})
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
            multiple={field.multiple}
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
        label: 'Enter coverType name',
        name: 'name',
      },
      {
        type: 'number',
        label: 'Enter electric coverType price',
        name: 'priceE',
        min: 0
      },
      {
        type: 'number',
        label: 'Enter analog coverType price',
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
        label: 'Enter coverType length',
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
        help: 'Chose coverType image',
        label: 'CoverType image',
      },
      {
        type: 'uploadImage',
        name: 'bannersForm',
        fieldName: 'banners',
        help: 'Chose coverType banner',
        label: 'CoverType banner',
        images: form.banners,
      },
      {
        type: 'uploadImage',
        name: 'previewsForm',
        fieldName: 'previews',
        help: 'Chose coverType previews',
        label: 'CoverType previews',
        images: form.previews,
        multiple: true
      }
    ]

    return (
      <div>
        <h2>Add new coverType</h2>
        {this.generateFieldsDOM(form, datepicker, fields)}
        <hr/>
        <Button bsStyle='primary' onClick={this.submit}>Add coverType</Button>
      </div>
    );
  }
});
