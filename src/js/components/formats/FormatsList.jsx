import React from 'react';
import Format from './Format.jsx';
import ListGroup from '../../../../node_modules/react-bootstrap/lib/ListGroup';
import FormatsActionCreators from '../../actions/FormatsActionCreators.js';
import FormatsStore from '../../stores/FormatsStore.js';

export default React.createClass({
  getInitialState() {
    FormatsActionCreators.loadFormats()

    return {formats: FormatsStore.getAll()}
  },

  createFormatsDom(formats) {
    return formats.map(format => <Format format={format} />)
  },

  _onChange() {
    this.setState({formats: FormatsStore.getAll()});
  },

  componentDidMount() {
    FormatsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    FormatsStore.removeChangeListener(this._onChange);
  },

  render() {
    let {formats} = this.state;

    return (
      <ListGroup>
        {this.createFormatsDom(formats)}
      </ListGroup>
    );
  }
});
