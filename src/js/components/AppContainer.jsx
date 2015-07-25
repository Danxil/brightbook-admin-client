import React from 'react';
import {RouteHandler} from 'react-router';
import NavigationMenu from './NavigationMenu.jsx'

export default React.createClass({
  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>Brightstar admin</h1>
        </div>
        <div className="row">
          <div className="col-xs-2">
            <NavigationMenu/>
          </div>
          <div className="col-xs-10">
            <RouteHandler/>
          </div>
        </div>
      </div>
    );
  }
});
