import React, {PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import ItemsList from './ItemsList.jsx';

export default React.createClass({
  propTypes: {
    items: PropTypes.array.isRequired
  },

  getDefaultProps() {
    return {
      items: []
    }
  },

  render() {
    let {items} = this.props;
    return (
      <div className="container">
        <Jumbotron>
          <h1>Learning Flux</h1>
          <p>
            Below is a list of tasks you can implement to better grasp the patterns behind Flux.<br />
            Most features are left unimplemented with clues to guide you on the learning process.
          </p>
        </Jumbotron>

        <ItemsList items={items} />
      </div>
    );
  }
});
