import React from 'react';
import {Input, Button} from 'react-bootstrap';
import Constants from '../../Constants';

export default React.createClass({
  render() {
    let {image, className, help, label, onDeleteImg, fieldName} = this.props;
    let elem
    let imgStyle = {
      maxWidth: '100%'
    }

    if (image && !image.delete) {
      let srcPath = Constants.ConfigSources.SERVER_BASE_URL + image.link

      elem = (
        <div>
          <p className="clearfix">
            <label>{label}</label>
            <Button className="pull-right" onClick={onDeleteImg.bind(this, image.id, fieldName)}>Delete image</Button>
          </p>
          <div>
            <img src={srcPath} className={className} style={imgStyle} alt=""/>
          </div>
        </div>
      )
    }
    else
      elem = (<Input accept="image/*" type="file" name="file" help={help} />)

    return (<form className="form-group">{elem}</form>);
  }
});
