import React from 'react';
import CoverType from './CoverType.jsx';
import ListGroup from '../../../../node_modules/react-bootstrap/lib/ListGroup';
import CoverTypesActionCreators from '../../actions/CoverTypesActionCreators.js';
import CoverTypesStore from '../../stores/CoverTypesStore.js';

export default React.createClass({
  getInitialState() {
    CoverTypesActionCreators.loadCoverTypes()

    return {coverTypes: CoverTypesStore.getAll()}
  },

  createCoverTypesDom(coverTypes) {
    return coverTypes.map(coverType => <CoverType coverType={coverType} />)
  },

  _onChange() {
    this.setState({coverTypes: CoverTypesStore.getAll()});
  },

  componentDidMount() {
    CoverTypesStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    CoverTypesStore.removeChangeListener(this._onChange);
  },

  render() {
    let {coverTypes} = this.state;

    return (
      <ListGroup>
        {this.createCoverTypesDom(coverTypes)}
      </ListGroup>
    );
  }
});
