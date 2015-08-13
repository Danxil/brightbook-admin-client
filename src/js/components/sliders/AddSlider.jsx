import React from 'react';
import SlidersActionCreators from '../../actions/SlidersActionCreators.js';
import SlidersStore from '../../stores/SlidersStore.js';
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
      slide: this.refs.sliderSlide.getDOMNode(),
    }

    SlidersActionCreators.addSlider(data, fileForms).then(function(result) {
      this.transitionTo('sliders')
    }.bind(this))
  },

  render() {
    var {form} = this.state

    var fields = [
      {
        type: 'text',
        label: 'Enter slider name',
        name: 'name',
      },
      {
        type: 'text',
        label: 'Enter slider title',
        name: 'title',
      },
      {
        type: 'uploadImage',
        name: 'SliderSlide',
        fieldName: 'slides',
        help: 'Chose slider slide',
        label: 'Slider slide',
        multiple: true
      },
    ]

    return (
      <div>
        <h2>Add new slider</h2>
        {FieldsGenerator.call(this, this.state, fields)}
        <hr/>
        <Button bsStyle='primary' onClick={this.submit}>Add slider</Button>
      </div>
    );
  }
});
