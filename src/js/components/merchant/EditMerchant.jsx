import React from 'react';
import MerchantActionCreators from '../../actions/MerchantActionCreators.js';
import MerchantStore from '../../stores/MerchantStore.js';
import Constants from '../../Constants.js';
import {Button, Input, Modal, ButtonToolbar} from 'react-bootstrap';
import {Navigation, Link} from 'react-router';
import FieldsGenerator from '../../tools/FieldsGenerator.js';

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    var obj = {}

    MerchantActionCreators.loadMerchant()

    return obj
  },

  _onChange() {
    this.setState(function(prev) {
      var merchant = MerchantStore.get('merchant')

      prev.form = merchant

      return prev
    })
  },

  componentDidMount() {
    MerchantStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    MerchantStore.removeChangeListener(this._onChange);
  },

  submit() {
    MerchantActionCreators.editMerchant(this.state.form).then(function() {
      this.transitionTo('hello')
    }.bind(this))
  },

  render() {
    let {form} = this.state

    if (!form)
      return(<div></div>)

    var fields = [
      {
        type: 'number',
        label: 'Merchant number',
        name: 'number',
      }
    ]

    return (
      <div>
        <div className="form-group clearfix">
          <h2>
            Merchant
          </h2>
        </div>
        {FieldsGenerator.call(this, this.state, fields)}
        <hr/>
        <ButtonToolbar className="pull-left">
          <Button bsStyle='primary' onClick={this.submit}>Edit merchant</Button>
        </ButtonToolbar>

      </div>
    );
  }
});
