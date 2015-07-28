import React from 'react';
import {Input, Button} from 'react-bootstrap';
import Constants from '../../Constants';

export default React.createClass({
  render() {
    let {src, className, name, help, label, onDeleteImg} = this.props;
    let elem
    let imgStyle = {
      maxWidth: '100%'
    }

    if (src) {
      let srcPath = Constants.ConfigSources.SERVER_BASE_URL + src

      elem = (
        <div>
          <label>{label}</label>
          <Button bsStyle='danger' className="pull-right" onClick={onDeleteImg}>Delete image</Button>
          <div>
            <img src={srcPath} className={className} style={imgStyle} alt=""/>
            <input type="text" value={src} name={name} hidden="true" />
          </div>
        </div>
      )
    }
    else
      elem = <Input type="file" name={name} help={help} />

    return (<div className="form-group">{elem}</div>);
  }
});
