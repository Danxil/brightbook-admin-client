import React from 'react';
import Rubric from './Rubric.jsx';
import ListGroup from '../../../../node_modules/react-bootstrap/lib/ListGroup';
import RubricsActionCreators from '../../actions/RubricsActionCreators.js';
import RubricsStore from '../../stores/RubricsStore.js';

export default React.createClass({
  getInitialState() {
    RubricsActionCreators.loadRubrics()

    return {rubrics: RubricsStore.getAll()}
  },

  createRubricsDom(rubrics) {
    return rubrics.map(rubric => <Rubric rubric={rubric} />)
  },

  _onChange() {
    this.setState({rubrics: RubricsStore.getAll()});
  },

  componentDidMount() {
    RubricsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    RubricsStore.removeChangeListener(this._onChange);
  },

  render() {
    let {rubrics} = this.state;

    return (
      <ListGroup>
        {this.createRubricsDom(rubrics)}
      </ListGroup>
    );
  }
});
