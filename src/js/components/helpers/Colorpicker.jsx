import React from 'react';
import Colorpicker from 'react-colorpicker';

export default React.createClass({
  render() {
    let {onChange, label, color} = this.props;
    let elem

    var colorpickerWrapperStyle = {
      height: '400px',
      position: 'relative',
    }

    elem = (<Colorpicker
      color={color}
      onChange={onChange}
      />)

    return (
      <div className="form-group">
        <label>{label}</label>
        <div style={colorpickerWrapperStyle}>
          {elem}
        </div>
      </div>
    );
  }
})