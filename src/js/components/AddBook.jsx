import React from 'react';
import BooksActionCreators from '../actions/BooksActionCreators.js';
import BooksStore from '../stores/BooksStore.js';
import {Button, Input} from 'react-bootstrap';
import {Navigation} from 'react-router';
import UploadImage from './helpers/UploadImage.jsx';

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

  componentDidMount() {
    //CategoriesStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    //CategoriesStore.removeChangeListener(this._onChange);
  },


  nameChange() {
    this.setState(function(prev) {
      prev.form.name = this.refs.name.getValue()

      return prev
    })
  },

  submit() {
    var data = this.state.form
    var form = this.refs.form.getDOMNode()

    BooksActionCreators.addBook(data, form).then(function() {
      this.transitionTo('books')
    }.bind(this))
  },

  render() {
    let {headerColors, form} = this.state
    
    if (!headerColors)
      return (<div></div>)

    return (
      <div>
        <h2>Add new book</h2>
        <Input
          name="name"
          type='text'
          value={form.name}
          label='Enter book name'
          ref='name'
          onChange={this.nameChange} />
        <UploadImage ref="form" help="Chose book image" label="Book image" />
        <hr/>
        <Button bsStyle='primary' onClick={this.submit}>Add book</Button>
      </div>
    );
  }
});
