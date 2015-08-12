import React from 'react';
import '../../../../node_modules/react/addons';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router';

export default React.createClass({
  render() {
    let {contact} = this.props;

    return (
    <Link to="edit-contact" params={{id: contact.id}} className="list-group-item">
      {contact.name}
    </Link>
    );
  }
});
