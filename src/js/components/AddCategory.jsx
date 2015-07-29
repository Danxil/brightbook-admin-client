import React from 'react';
import CategoriesActionCreators from '../actions/CategoriesActionCreators.js';
import HeaderColorsActionCreators from '../actions/HeaderColorsActionCreators.js';
import CategoriesStore from '../stores/CategoriesStore';
import HeaderColorsStore from '../stores/HeaderColorsStore';
import {Button, Input} from 'react-bootstrap';
import {Navigation} from 'react-router';
import UploadImage from './helpers/UploadImage.jsx';

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    HeaderColorsActionCreators.loadHeaderColors()

    return {
      form: {
        name: '',
        headerColor: 1
      }
    }
  },


  _onChange() {
    this.setState(function(prev) {
      prev.headerColors = HeaderColorsStore.getAll()  

      if (prev.form && !!prev.form.headerColor.id)
        prev.form.headerColor = prev.form.headerColor.id

      return prev
    })
  },

  componentDidMount() {
    CategoriesStore.addChangeListener(this._onChange);
    HeaderColorsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    CategoriesStore.removeChangeListener(this._onChange);
    HeaderColorsStore.removeChangeListener(this._onChange);
  },


  nameChange() {
    this.setState(function(prev) {
      prev.form.name = this.refs.name.getValue()

      return prev
    })
  },


  headerColorChange() {
    this.setState(function(previousState) {
      previousState.form.headerColor = this.refs.headerColor.getValue()
      return previousState
    })
  },

  submit() {
    var data = this.state.form
    var form = this.refs.form.getDOMNode()

    CategoriesActionCreators.addCategory(data, form).then(function() {
      this.transitionTo('categories')
    }.bind(this))
  },

  render() {
    let {headerColors, form} = this.state
    
    if (!headerColors)
      return (<div></div>)

    let headerColorsDOM = headerColors.map(item => <option value={item.id}>{item.color}</option>)

    return (
      <div>
        <h2>Add new category</h2>
        <Input
          name="name"
          type='text'
          value={form.name}
          label='Enter category name'
          ref='name'
          onChange={this.nameChange} />
        <Input name="headerColor" type='select' value={form.headerColor} onChange={this.headerColorChange} ref='headerColor' label='Header font color'>
          {headerColorsDOM}
        </Input>
        <UploadImage ref="form" help="Chose category image" label="Category image" />
        <hr/>
        <Button bsStyle='primary' onClick={this.submit}>Add category</Button>
      </div>
    );
  }
});
