import React from 'react';
import {Input, Button} from 'react-bootstrap';
import Constants from '../../Constants';
import _ from 'underscore';

export default React.createClass({
  render() {
    var {images, className, help, label, onDeleteImg, fieldName, multiple} = this.props;
    var imgStyle = {
      maxWidth: '100%',
      maxHeight: '500px',
    }

    images = _.clone(images)

    if (!images)
      images = []

    if (!_.isArray(images))
      images = [images]

    var elems = []

    for (var i = 0; i < images.length; i++) {
      var image = images[i]

      if (image.delete) {
        images.splice(i, 1)
        i--
        continue
      }

      let srcPath = Constants.ConfigSources.SERVER_BASE_URL + image.link

      elems.push(<div className="form-group">
        <p className="clearfix">
          <Button className="pull-right" onClick={onDeleteImg.bind(this, image.id, fieldName)}>Delete image</Button>
        </p>
        <div>
          <img src={srcPath} className={className} style={imgStyle} alt=""/>
        </div>
      </div>)
    }

    if (images.length > 0 && !multiple)
      var input = ('')
    else if (multiple)
      var input = (
        <div style={{clear: 'both'}}>
          <Input accept="image/*" type="file" multiple name="file" help={help} />
        </div>)
    else
      var input = (
        <div style={{clear: 'both'}}>
          <Input accept="image/*" type="file" name="file" help={help} />
        </div>)

    return (<form>
      <label className="pull-left">{label}</label>
      {elems}
      {input}
    </form>);
  }
});
