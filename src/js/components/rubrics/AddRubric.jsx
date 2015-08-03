import React from 'react';
import RubricsActionCreators from '../../actions/RubricsActionCreators.js';
import RubricsStore from '../../stores/RubricsStore.js';
import {Button, Input} from 'react-bootstrap';
import {Navigation} from 'react-router';
import Constants from '../../Constants.js';
import Colorpicker from '../helpers/Colorpicker.jsx';


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

  generateFieldsDOM(form, fields) {
    function valueChange(fieldName) {
      this.setState(function(prev) {
        prev.form[fieldName] = this.refs[fieldName].getValue()

        return prev
      })
    }

    function colorChange(fieldName, color) {
      this.setState(function(prev) {
        prev.form[fieldName] = color.toHex()
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

        case 'colorPicker':
          return (<Colorpicker
            color={field.color}
            name={field.name}
            label={field.label}
            onChange={colorChange.bind(this, field.name)}/>)
          break
      }
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
        type: 'colorPicker',
        label: 'Choose rubric color',
        name: 'color',
        color: form.color
      }
    ]

    return (
      <div>
        <h2>Add new rubric</h2>
        {this.generateFieldsDOM(form, fields)}
        <hr/>
        <Button bsStyle='primary' onClick={this.submit}>Add rubric</Button>
      </div>
    );
  }
});
