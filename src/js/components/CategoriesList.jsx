import React from 'react';
import Category from './Category.jsx';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import CategoriesActionCreators from '../actions/CategoriesActionCreators.js';
import CategoriesStore from '../stores/CategoriesStore';

export default React.createClass({
  getInitialState() {
    CategoriesActionCreators.loadCategories()

    return CategoriesStore.getAll()
  },

  createCategoriesDom(categories) {
    return categories.map(category => <Category category={category} />)
  },

  _onChange() {
    this.setState(CategoriesStore.getAll());
  },

  componentDidMount() {
    CategoriesStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    CategoriesStore.removeChangeListener(this._onChange);
  },

  render() {
    let {categories, loading} = this.state;

    return (
      <ListGroup>
        {this.createCategoriesDom(categories)}
      </ListGroup>
    );
  }
});
