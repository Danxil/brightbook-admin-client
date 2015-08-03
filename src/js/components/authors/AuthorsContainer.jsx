import React from 'react';
import {Link} from 'react-router';
import AuthorsList from './Authors.jsx';

export default React.createClass({
  render() {
    return (
      <div>
        <p className="text-right">
          <Link className="btn btn-primary" to="/add-author">Add author</Link>
        </p>
        <AuthorsList />
      </div>
    );
  }
});
