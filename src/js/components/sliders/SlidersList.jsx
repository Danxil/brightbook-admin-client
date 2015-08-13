import React from 'react';
import Slider from './Slider.jsx';
import ListGroup from '../../../../node_modules/react-bootstrap/lib/ListGroup';
import SlidersActionCreators from '../../actions/SlidersActionCreators.js';
import SlidersStore from '../../stores/SlidersStore';

export default React.createClass({
  getInitialState() {
    SlidersActionCreators.loadSliders()

    return {sliders: SlidersStore.getAll()}
  },

  createSlidersDom(sliders) {
    return sliders.map(slider => <Slider slider={slider} />)
  },

  _onChange() {
    this.setState({sliders: SlidersStore.getAll()});
  },

  componentDidMount() {
    SlidersStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    SlidersStore.removeChangeListener(this._onChange);
  },

  render() {
    let {sliders} = this.state;

    return (
      <ListGroup>
        {this.createSlidersDom(sliders)}
      </ListGroup>
    );
  }
});
