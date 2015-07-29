import React from 'react';
import Datepicker from 'react-datepicker'

export default React.createClass({
  render() {
    let {selected, onChange, fieldName, label} = this.props;
    let elem

    elem = (<Datepicker selected={selected} onChange={onChange.bind(this, fieldName)} />)

    return (
      <div className="form-group">
        <label>{label}</label>
        {elem}
      </div>
    );
  }
})