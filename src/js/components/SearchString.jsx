import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import ActionCreator from '../actions/ItemsActionCreators';

export default React.createClass({
  changeHandler() {
      let value = this.refs.searchString.getValue()

      this.setState({searchString: value})
      ActionCreator.loadItems(value, 1)
  },

  getInitialState() {
    return {
      searchString: this.props.searchString
    }
  },

  render() {
    return (
        <Input
            type='text'
            value={this.state.searchString}
            placeholder='Enter text'
            label='Enter search string'
            ref='searchString'
            onChange={this.changeHandler} />
    );
  }
});
