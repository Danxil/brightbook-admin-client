import React from 'react';
import '../../../../node_modules/react/addons';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router';

export default React.createClass({
  render() {
    let {coverType} = this.props;

    return (
    <Link to="edit-cover-type" params={{id: coverType.id}} className="list-group-item">
      {coverType.name}
    </Link>
    );
  }
});
