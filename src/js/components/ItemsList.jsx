import React from 'react';
import Item from './Item.jsx';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Alert from 'react-bootstrap/lib/Alert';
import ActionCreator from '../actions/ItemsActionCreators';
var InfiniteScroll = require('react-infinite-scroll')(React);

export default React.createClass({
  createItemsDom(items) {
    return items.map(item => <Item item={item} />)
  },

  loadMoreItemsHandler() {
    //next tick
    setTimeout(function() {
      ActionCreator.loadItems(this.props.searchString, this.props.page + 1)
    }.bind(this))
  },

  render() {
    let {items, page} = this.props;

    return (
      <form>
        <ListGroup>
        <InfiniteScroll
            loadMore={this.loadMoreItemsHandler}
            hasMore={!this.props.loading && !this.props.fullItems}
            loader={<div className="loader">Loading ...</div>}>
            {this.createItemsDom(items)}
        </InfiniteScroll>
        </ListGroup>
      </form>
    );
  }
});
