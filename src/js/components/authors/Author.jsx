import React from 'react';
import '../../../../node_modules/react/addons';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router';

export default React.createClass({
  render() {
    let {author} = this.props;

    return (
    <Link to="edit-author" params={{id: author.id}} className="list-group-item">
      {author.name}
    </Link>
    );
  }
});
