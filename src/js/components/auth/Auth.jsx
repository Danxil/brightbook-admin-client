import React from 'react';
import {Link, Navigation} from 'react-router';
import {Button, Input} from 'react-bootstrap';
import FieldsGenerator from '../../tools/FieldsGenerator.js';
import AuthActionCreators from '../../actions/AuthActionCreators.js';
import Cookie from 'js-cookie'

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    return {
      form: {},
    }
  },
  submit() {
    var data = this.state.form

    AuthActionCreators.login(data).then(function(result) {
      this.transitionTo('/')
    }.bind(this), function() {
      this.transitionTo('/auth')
    }.bind(this))
  },

  render() {
    if (Cookie.get('token'))
      return this.transitionTo('/')

    var fields = [
      {
        type: 'text',
        label: 'Enter email',
        name: 'email',
      },
      {
        type: 'password',
        label: 'Enter password',
        name: 'password',
      },
    ]

    return (
      <div>
        <div>
          <h2>Authorisation</h2>
          {FieldsGenerator.call(this, this.state, fields)}
          <hr/>
          <Button bsStyle='primary' onClick={this.submit}>Submit</Button>
        </div>
      </div>
    );
  }
});
