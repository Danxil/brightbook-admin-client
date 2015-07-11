import React from 'react';
import Item from './Item.jsx';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Alert from 'react-bootstrap/lib/Alert';
import ActionCreator from '../actions/ItemsActionCreators';
var InfiniteScroll = require('react-infinite-scroll')(React);

export default React.createClass({
  getDefaultProps() {
    return {
      items: [],
      loading: true
    };
  },

  createItemsDom(items) {
    return items.map(item => <Item item={item} />)
  },

  loadMoreItemsHandler() {
    console.log('load more')

    //ActionCreator.loadItems()
  },

  render() {
    let {items} = this.props;

    return (
      <form>
        <ListGroup>
        <InfiniteScroll
            pageStart="0"
            loadMore={this.loadMoreItemsHandler}
            hasMore={!this.props.loading}
            loader={<div className="loader">Loading ...</div>}>
            {this.createItemsDom(items)}
        </InfiniteScroll>
        </ListGroup>
      </form>
    );
  }
});
