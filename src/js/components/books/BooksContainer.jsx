import React from 'react';
import {Link} from 'react-router';
import BooksList from './BooksList.jsx';

export default React.createClass({
  render() {
    return (
      <div>
        <p className="text-right">
          <Link className="btn btn-primary" to="/add-book">Add book</Link>
        </p>
        <BooksList />
      </div>
    );
  }
});
