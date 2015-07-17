import React from 'react';
import 'react/addons';

export default React.createClass({

  render() {
    let {category} = this.props;

    return (
      <h3>{category.name}</h3>
    );
  }
});
