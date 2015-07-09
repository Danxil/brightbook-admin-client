import React from 'react';
import Item from './Item.jsx';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Alert from 'react-bootstrap/lib/Alert';

export default React.createClass({

  getDefaultProps() {
    return {
      items: []
    };
  },

  render() {
    let {items} = this.props;

    if (items.length === 0) {
      return (
        <Alert bsStyle="warning">
          <strong>You have no tasks</strong> Create some using the Add New button below.
        </Alert>
      );
    }

    return (
      <form>
        <ListGroup>
          {items.map(item =>
            <Item item={item} />
          )}
        </ListGroup>
      </form>
    );
  }
});
