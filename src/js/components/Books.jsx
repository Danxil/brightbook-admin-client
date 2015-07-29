import React from 'react';
import 'react/addons';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router';

export default React.createClass({
  render() {
    let {book} = this.props;

    return (
    <Link to="edit-book" params={{id: book.id}} className="list-group-item">
      {book.name}
    </Link>
    );
  }
});
