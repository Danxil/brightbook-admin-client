import React from 'react';
import {Link} from 'react-router';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

export default React.createClass({
  render() {
    return(
      <div>
        <p>
          <Link to="/">Home</Link>
        </p>
        <p>
          <Link to="/categories">Categories</Link>
        </p>
        <p>
          <Link to="/books">Books</Link>
        </p>
      </div>
    );
  }
})