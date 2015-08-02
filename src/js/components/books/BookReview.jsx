import React from 'react';
import '../../../../node_modules/react/addons';
import {ListGroup, ListGroupItem, Input} from 'react-bootstrap';
import {Link} from 'react-router';
import UploadImage from '../helpers/UploadImage.jsx';

export default React.createClass({
  getInitialState() {
    var obj = {}

    obj.review = this.props.review

    return obj
  },

  generateFieldsDOM(form, fields) {
    function valueChange(fieldName) {
      this.setState(function(prev) {
        prev.review[fieldName] = this.refs[fieldName].getValue()

        return prev
      })
    }

    function deleteFile(id, fieldName) {
      this.setState(function(prev) {
        prev.review[fieldName].forEach(function(item, index) {
          if (item && item.id == id)
            prev.review[fieldName][index].delete = true
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
    let {review} = this.state;

    var fields = [
      {
        type: 'text',
        label: 'Enter author name',
        name: 'author',
      },
      {
        type: 'textarea',
        label: 'Enter review',
        name: 'text',
      },
      {
        type: 'uploadImage',
        name: 'avatarForm',
        fieldName: 'avatars',
        help: 'Chose author avatar',
        label: 'Author avatar',
        images: review.avatars,
      }
    ]

    return (
      <div>
        {this.generateFieldsDOM(review, fields)}
        <hr/>
      </div>)
  }
});
