import React from 'react';
import '../../../../node_modules/react/addons';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router';

export default React.createClass({
  render() {
    let {slider} = this.props;

    return (
    <Link to="edit-slider" params={{id: slider.id}} className="list-group-item">
      {slider.title}
    </Link>
    );
  }
});
