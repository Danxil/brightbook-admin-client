import React from 'react';
import FormatsActionCreators from '../../actions/FormatsActionCreators.js';
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

    FormatsActionCreators.addFormat(data).then(function(result) {
      this.transitionTo('formats')
    }.bind(this))
  },

  render() {
    var {form} = this.state

    var fields = [
      {
        type: 'text',
        label: 'Enter format',
        name: 'name',
      }
    ]

    return (
      <div>
        <h2>Add new format</h2>
        {FieldsGenerator.call(this, this.state, fields)}
        <hr/>
        <Button bsStyle='primary' onClick={this.submit}>Add format</Button>
      </div>
    );
  }
});
