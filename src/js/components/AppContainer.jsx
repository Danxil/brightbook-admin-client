import React from 'react';
import ItemsStore from '../stores/ItemsStore';
import ActionCreator from '../actions/ItemsActionCreators';
import SearchString from './SearchString.jsx';
import ItemsList from './ItemsList.jsx';

export default React.createClass({
  getInitialState() {
    return ItemsStore.getAll()
  },

  _onChange() {
    this.setState(ItemsStore.getAll());
  },

  componentDidMount() {
    ItemsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    ItemsStore.removeChangeListener(this._onChange);
  },

  render() {
    let {items, loading, searchString, page, fullItems} = this.state;

    return (
        <div className="container">
          <div className="page-header">
            <h1>Itunes search</h1>
          </div>
          <SearchString searchString={searchString} />
          <ItemsList items={items} page={page} searchString={searchString} loading={loading} fullItems={fullItems} />
        </div>
    );
  }
});
