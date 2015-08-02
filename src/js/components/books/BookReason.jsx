import React from 'react';
import '../../../../node_modules/react/addons';
import {ListGroup, ListGroupItem, Input} from 'react-bootstrap';
import {Link} from 'react-router';
import UploadImage from '../helpers/UploadImage.jsx';

export default React.createClass({
  getInitialState() {
    var obj = {}

    obj.reason = this.props.reason

    return obj
  },

  generateFieldsDOM(form, fields) {
    function valueChange(fieldName) {
      this.setState(function(prev) {
        prev.reason[fieldName] = this.refs[fieldName].getValue()

        return prev
      })
    }

    function deleteFile(id, fieldName) {
      this.setState(function(prev) {
        prev.reason[fieldName].forEach(function(item, index) {
          if (item && item.id == id)
            prev.reason[fieldName][index].delete = true
        })

        return prev
      })
    }

    return fields.map(function(field) {
      switch (field.type) {
        case 'text':
          return (<Input
            type={field.type}
            value={form[field.name]}
            label={field.label}
            ref={field.name}
            onChange={valueChange.bind(this, field.name)}/>)
          break

        case 'textarea':
          return (<Input
            type={field.type}
            value={form[field.name]}
            label={field.label}
            ref={field.name}
            onChange={valueChange.bind(this, field.name)}/>)
          break

        case 'uploadImage':
          return (<UploadImage
            ref={field.name}
            images={field.images}
            help={field.help}
            onDeleteImg={deleteFile.bind(this)}
            fieldName={field.fieldName}
            multiple={field.multiple}
            label={field.label} />)
          break
      }
    }.bind(this))
  },

  render() {
    let {reason} = this.state;

    var fields = [
      {
        type: 'text',
        label: 'Enter author name',
        name: 'author',
      },
      {
        type: 'textarea',
        label: 'Enter reason',
        name: 'text',
      },
      {
        type: 'uploadImage',
        name: 'avatarForm',
        fieldName: 'avatars',
        help: 'Chose author avatar',
        label: 'Author avatar',
        images: reason.avatars,
      }
    ]

    return (
      <div>
        {this.generateFieldsDOM(reason, fields)}
        <hr/>
      </div>)
  }
});
