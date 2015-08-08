import React from 'react';
import {Link, Navigation} from 'react-router';
import {Button, Input} from 'react-bootstrap';
import FieldsGenerator from '../../tools/FieldsGenerator.js';
import AuthActionCreators from '../../actions/AuthActionCreators.js';
import Cookie from 'js-cookie'
import UserStore from '../../stores/UserStore.js';

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    return {
      form: {},
    }
  },
  submit() {
    var data = this.state.form

    AuthActionCreators.login(data).then().then(function(result) {
      AuthActionCreators.checkAdmin()
    })
  },

  render() {
    if (UserStore.get('user')) {
      this.transitionTo('/')
      return <div></div>
    }

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
