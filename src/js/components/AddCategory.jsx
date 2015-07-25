import React from 'react';
import CategoriesActionCreators from '../actions/CategoriesActionCreators.js';
import CategoriesStore from '../stores/CategoriesStore';
import {Button, Input} from 'react-bootstrap';
import {Navigation} from 'react-router';

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    return {
      form: {
        name: ''
      }
    }
  },

  handleChange() {
    this.setState({form: {name: this.refs.name.getValue()}})
  },

  submit() {
    CategoriesActionCreators.addCategory(this.state.form).then(function() {
      this.transitionTo('categories')
    }.bind(this))
  },

  render() {
    return (
      <div>
        <h2>Add new category</h2>
        <Input
          type='text'
          value={this.state.form.name}
          label='Enter category name'
          ref='name'
          onChange={this.handleChange} />
        <Button bsStyle='primary' onClick={this.submit}>Add category</Button>
      </div>
    );
  }
});
