import React from 'react';
import RubricsActionCreators from '../../actions/RubricsActionCreators.js';
import RubricsStore from '../../stores/RubricsStore.js';
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

    RubricsActionCreators.addRubric(data).then(function(result) {
      this.transitionTo('rubrics')
    }.bind(this))
  },

  render() {
    var {form} = this.state

    var fields = [
      {
        type: 'text',
        label: 'Enter rubric name',
        name: 'name',
      },
      {
        type: 'textarea',
        label: 'Enter rubric description',
        name: 'description',
      },
      {
        type: 'colorPicker',
        label: 'Choose light rubric color',
        name: 'color',
        color: form.color
      },
      {
        type: 'colorPicker',
        label: 'Choose dark rubric color',
        name: 'additionalColor',
        color: form.additionalColor
      }
    ]

    return (
      <div>
        <h2>Add new rubric</h2>
        {FieldsGenerator.call(this, this.state, fields)}
        <hr/>
        <Button bsStyle='primary' onClick={this.submit}>Add rubric</Button>
      </div>
    );
  }
});
