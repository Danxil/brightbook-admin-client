import React from 'react';
import 'react/addons';
import ActionCreator from '../actions/ItemsActionCreators';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Video from './Video.jsx';

export default React.createClass({

  render() {
    let {item} = this.props;

    return (
      <ListGroupItem>
        <h3>{item.trackCensoredName}</h3>
        <Video src={item.previewUrl}/>
      </ListGroupItem>
    );
  }
});
