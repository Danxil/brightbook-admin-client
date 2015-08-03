import React from 'react';
import Category from './Category.jsx';
import ListGroup from '../../../../node_modules/react-bootstrap/lib/ListGroup';
import CategoriesActionCreators from '../../actions/CategoriesActionCreators.js';
import CategoriesStore from '../../stores/CategoriesStore';

export default React.createClass({
  getInitialState() {
    CategoriesActionCreators.loadCategories()

    return {categories: CategoriesStore.getAll()}
  },

  createCategoriesDom(categories) {
    return categories.map(category => <Category category={category} />)
  },

  _onChange() {
    this.setState({categories: CategoriesStore.getAll()});
  },

  componentDidMount() {
    CategoriesStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    CategoriesStore.removeChangeListener(this._onChange);
  },

  render() {
    let {categories} = this.state;

    return (
      <ListGroup>
        {this.createCategoriesDom(categories)}
      </ListGroup>
    );
  }
});
