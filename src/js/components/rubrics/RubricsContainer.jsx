import React from 'react';
import {Link} from 'react-router';
import RubricsList from './Rubrics.jsx';

export default React.createClass({
  render() {
    return (
      <div>
        <p className="text-right">
          <Link className="btn btn-primary" to="/add-rubric">Add rubric</Link>
        </p>
        <RubricsList />
      </div>
    );
  }
});
