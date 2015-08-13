import React from 'react';
import {Link} from 'react-router';
import SlidersList from './SlidersList.jsx';

export default React.createClass({
  render() {
    return (
      <div>
        <p className="text-right">
          <Link className="btn btn-primary" to="/add-slider">Add slider</Link>
        </p>
        <SlidersList />
      </div>
    );
  }
});
