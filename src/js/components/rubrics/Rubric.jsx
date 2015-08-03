import React from 'react';
import '../../../../node_modules/react/addons';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router';

export default React.createClass({
  render() {
    let {rubric} = this.props;

    return (
    <Link to="edit-rubric" params={{id: rubric.id}} className="list-group-item">
      {rubric.name}
    </Link>
    );
  }
});
