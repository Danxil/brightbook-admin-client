import React from 'react';
import {Input, Button} from 'react-bootstrap';
import Constants from '../../Constants';
import _ from 'underscore';

export default React.createClass({
  render() {
    var {files, help, label, onDeleteFile, fieldName, multiple} = this.props;

    files = _.clone(files)

    if (!files)
      files = []

    if (!_.isArray(files))
      files = [files]

    var elems = []

    for (var i = 0; i < files.length; i++) {
      var file = files[i]

      if (file.delete) {
        files.splice(i, 1)
        i--
        continue
      }

      let link = Constants.ConfigSources.SERVER_BASE_URL + file.link

      elems.push(<div className="form-group">
        <p className="clearfix">
          <Button className="pull-right" onClick={onDeleteFile.bind(this, file.id, fieldName)}>Delete file</Button>
        </p>
        <div>
          <p>{link}</p>
        </div>
      </div>)
    }

    if (files.length > 0 && !multiple)
      var input = ('')
    else if (multiple)
      var input = (
        <div style={{clear: 'both'}}>
          <Input accept="file/*" type="file" multiple name="file" help={help} />
        </div>)
    else
      var input = (
        <div style={{clear: 'both'}}>
          <Input accept="file/*" type="file" name="file" help={help} />
        </div>)

    return (<form>
      <label className="pull-left">{label}</label>
      {elems}
      {input}
    </form>);
  }
});
