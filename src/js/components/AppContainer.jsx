import React from 'react';
import {RouteHandler, Navigation} from 'react-router';
import NavigationMenu from './NavigationMenu.jsx'
import Cookie from 'js-cookie'
import jq from 'jquery'

export default React.createClass({
  mixins: [Navigation],

  render() {
    if (Cookie.get('token'))
      jq.ajaxPrefilter(function( options ) {
        if ( !options.beforeSend) {
          options.beforeSend = function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + Cookie.get('token'));
          }
        }
      });
    else
      this.transitionTo('/auth')

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
