import React from 'react';
import {Link} from 'react-router';
import ContactsList from './ContactsList.jsx';

export default React.createClass({
  render() {
    return (
      <div>
        <p className="text-right">
          <Link className="btn btn-primary" to="/add-format">Add format</Link>
        </p>
        <ContactsList />
      </div>
    );
  }
});
