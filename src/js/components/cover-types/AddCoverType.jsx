import React from 'react';
import CoverTypesActionCreators from '../../actions/CoverTypesActionCreators.js';
import CoverTypesStore from '../../stores/CoverTypesStore.js';
import {Button, Input} from 'react-bootstrap';
import {Navigation} from 'react-router';
import Constants from '../../Constants.js';

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    return {
      form: {
        name: '',
      }
    }
  },

  _onChange() {
    this.setState(function(prev) {
      return prev
    })
  },

  submit() {
    var data = this.state.form

    CoverTypesActionCreators.addCoverType(data).then(function(result) {
      this.transitionTo('cover-types')
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
      }
    }.bind(this))
  },

  render() {
    var {form} = this.state

    var fields = [
      {
        type: 'text',
        label: 'Enter cover type',
        name: 'name',
      }
    ]

    return (
      <div>
        <h2>Add new cover type</h2>
        {this.generateFieldsDOM(form, fields)}
        <hr/>
        <Button bsStyle='primary' onClick={this.submit}>Add cover type</Button>
      </div>
    );
  }
});
