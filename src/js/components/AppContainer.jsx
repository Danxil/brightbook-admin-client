import React from 'react';
import TodoStore from '../stores/ItemsStore';
import ActionCreator from '../actions/ItemsActionCreators';
import App from './App.jsx';

export default React.createClass({
  getDefaultProps() {
    return {
      items: []
    };
  },

  _onChange() {
    this.setState(TodoStore.getAll());
  },

  getInitialState() {
    ActionCreator.loadItems()

    return {}
  },

  componentDidMount() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  },

  render() {
    let {items} = this.state;
    return (
      <App items={items} />
    );
  }
});
