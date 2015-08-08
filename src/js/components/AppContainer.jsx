import React from 'react';
import {RouteHandler, Navigation} from 'react-router';
import NavigationMenu from './NavigationMenu.jsx'
import UserStore from '../stores/UserStore.js';
import AuthActionCreators from '../actions/AuthActionCreators.js';

export default React.createClass({
  mixins: [Navigation],

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  },
  getInitialState() {
    var obj = {}

    AuthActionCreators.checkAdmin()

    return obj
  },
  _onChange() {
    this.setState(function(prev) {
      prev.user = UserStore.get('user')

      return prev
    })
  },
  render() {
    var {user} = this.state

    if (user)
      var conent =
        <div className="row">
          <div className="col-xs-2">
            <NavigationMenu/>
          </div>
          <div className="col-xs-10">
            <RouteHandler/>
          </div>
        </div>
    else if (user === null) {
      var conent =
        <div className="row">
          <div className="col-xs-4"></div>
          <div className="col-xs-4">
            <RouteHandler/>
          </div>
          <div className="col-xs-4"></div>
        </div>

      this.transitionTo('/auth')
    }
    else if (user === undefined)
      conent = <div></div>

    return (
      <div className="container">
        <div className="page-header">
          <h1>Brightstar admin</h1>
        </div>
        {conent}
      </div>
    );
  }
});
