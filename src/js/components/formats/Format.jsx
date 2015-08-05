import React from 'react';
import '../../../../node_modules/react/addons';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router';

export default React.createClass({
  render() {
    let {format} = this.props;

    return (
    <Link to="edit-format" params={{id: format.id}} className="list-group-item">
      {format.name}
    </Link>
    );
  }
});
