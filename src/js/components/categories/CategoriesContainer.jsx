import React from 'react';
import {Link} from 'react-router';
import CategoriesList from './CategoriesList.jsx';

export default React.createClass({
  render() {
    return (
      <div>
        <p className="text-right">
          <Link className="btn btn-primary" to="/add-category">Add category</Link>
        </p>
        <CategoriesList />
      </div>
    );
  }
});
