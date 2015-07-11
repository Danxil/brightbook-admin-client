import React from 'react';
import TodoStore from '../stores/ItemsStore';
import ActionCreator from '../actions/ItemsActionCreators';
import ItemsList from './ItemsList.jsx';

export default React.createClass({
  getDefaultProps() {
    return {
      items: []
    };
  },

  _onChange() {
    console.log(1)
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
    let {items, loading} = this.state;

    return (
        <div className="container">
          <div className="page-header">
            <h1>Example page header</h1>
          </div>

          <ItemsList items={items} loading={loading} />
        </div>
    );
  }
});
