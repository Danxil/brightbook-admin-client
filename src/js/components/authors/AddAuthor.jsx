import React from 'react';
import AuthorsActionCreators from '../../actions/AuthorsActionCreators.js';
import AuthorsStore from '../../stores/AuthorsStore.js';
import {Button, Input} from 'react-bootstrap';
import {Navigation} from 'react-router';
import Constants from '../../Constants.js';
import FieldsGenerator from '../../tools/FieldsGenerator.js';

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

  render() {
    var {form} = this.state

    var fields = [
      {
        type: 'text',
        label: 'Enter author',
        name: 'name',
      },
      {
        type: 'textarea',
        label: 'About author',
        name: 'about',
      },
      {
        type: 'text',
        label: 'Enter facebook link',
        name: 'facebookLink',
      },
      {
        type: 'text',
        label: 'Enter blog link',
        name: 'blogLink',
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
        {FieldsGenerator.call(this, this.state, fields)}
        <hr/>
        <Button bsStyle='primary' onClick={this.submit}>Add author</Button>
      </div>
    );
  }
});
