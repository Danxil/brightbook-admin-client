import React from 'react';
import Book from './Books.jsx';
import ListGroup from '../../../../node_modules/react-bootstrap/lib/ListGroup';
import BooksActionCreators from '../../actions/BooksActionCreators.js';
import BooksStore from '../../stores/BooksStore.js';

export default React.createClass({
  getInitialState() {
    BooksActionCreators.loadBooks()

    return {books: BooksStore.getAll()}
  },

  createBooksDom(books) {
    return books.map(book => <Book book={book} />)
  },

  _onChange() {
    this.setState({books: BooksStore.getAll()});
  },

  componentDidMount() {
    BooksStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    BooksStore.removeChangeListener(this._onChange);
  },

  render() {
    let {books} = this.state;

    return (
      <ListGroup>
        {this.createBooksDom(books)}
      </ListGroup>
    );
  }
});
