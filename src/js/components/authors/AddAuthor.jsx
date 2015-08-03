import React from 'react';
import AuthorsActionCreators from '../../actions/AuthorsActionCreators.js';
import AuthorsStore from '../../stores/AuthorsStore.js';
import {Button, Input} from 'react-bootstrap';
import {Navigation} from 'react-router';
import Constants from '../../Constants.js';
import UploadImage from './../helpers/UploadImage.jsx';

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    return {
      form: {}
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
      photo: this.refs.authorPhoto.getDOMNode(),
    }

    AuthorsActionCreators.addAuthor(data, fileForms).then(function(result) {
      this.transitionTo('authors')
    }.bind(this))
  },

  generateFieldsDOM(form, fields) {
    function valueChange(fieldName) {
      this.setState(function(prev) {
        prev.form[fieldName] = this.refs[fieldName].getValue()

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
    var {form} = this.state

    var fields = [
      {
        type: 'text',
        label: 'Enter author',
        name: 'name',
      },
      {
        type: 'uploadImage',
        name: 'authorPhoto',
        fieldName: 'photos',
        help: 'Chose author photo',
        label: 'Author photo',
        images: form.photos,
      },
    ]

    return (
      <div>
        <h2>Add new author</h2>
        {this.generateFieldsDOM(form, fields)}
        <hr/>
        <Button bsStyle='primary' onClick={this.submit}>Add author</Button>
      </div>
    );
  }
});
