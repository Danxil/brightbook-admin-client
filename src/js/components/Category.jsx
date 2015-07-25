import React from 'react';
import 'react/addons';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router';

export default React.createClass({

  render() {
    let {category} = this.props;

    return (
    <Link to="edit-category" params={{id: category.id}} className="list-group-item">
      {category.name}
    </Link>
    );
  }
});
