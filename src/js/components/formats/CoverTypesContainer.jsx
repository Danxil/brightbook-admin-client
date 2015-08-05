import React from 'react';
import {Link} from 'react-router';
import CoverTypesList from './CoverTypesList.jsx';

export default React.createClass({
  render() {
    return (
      <div>
        <p className="text-right">
          <Link className="btn btn-primary" to="/add-cover-type">Add cover type</Link>
        </p>
        <CoverTypesList />
      </div>
    );
  }
});
