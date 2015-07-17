import React from 'react';
import CategoriesContainer from './CategoriesContainer.jsx';

export default React.createClass({
  render() {
    return (
        <div className="container">
          <div className="page-header">
            <h1>Itunes search</h1>
          </div>
          <CategoriesContainer />
        </div>
    );
  }
});
