import React from 'react';
import {Input} from 'react-bootstrap';
import Datepicker from '../components/helpers/Datepicker.jsx';
import UploadImage from '../components/helpers/UploadImage.jsx';
import UploadFile from '../components/helpers/UploadFile.jsx';
import Tinymce from 'react-tinymce';
import _ from 'underscore';

export default function(obj, fields) {
  var {form, datepicker, selects} = obj

  function valueChange(fieldName) {
    this.setState(function(prev) {
      prev.form[fieldName] = this.refs[fieldName].getValue()

      return prev
    })
  }

  function multipleSelectChange(fieldName) {
    this.setState(function(prev) {
      prev.selects[fieldName] = this.refs[fieldName].getValue()

      return prev
    })
  }

  function selectChange(fieldName) {
    this.setState(function(prev) {
      prev.form[fieldName] = this.refs[fieldName].getValue()

      return prev
    })
  }

  function dateChange(fieldName, date) {
    this.setState(function(prev) {
      prev.datepicker[fieldName] = date
      prev.form[fieldName] = date.format(Constants.ConfigSources.DATE_FORMAT)
      return prev
    })
  }

  function deleteFile(id, fieldName) {
    this.setState(function(prev) {
      prev.form[fieldName].forEach(function(item, index) {
        if (item && item.id == id)
          prev.form[fieldName][index].delete = true
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

      case 'select':
        if (!field.multiple)
          return (<Input
            type={field.type}
            value={form[field.name] ? form[field.name].id : null}
            label={field.label}
            ref={field.name}
            onChange={selectChange.bind(this, field.name)}>
            {field.options.map((option)=> <option value={option.id}>{option[field.optionLabelField]}</option>)}
          </Input>)
        else
          return (<Input
            type={field.type}
            value={selects[field.name]}
            label={field.label}
            ref={field.name}
            multiple
            onChange={multipleSelectChange.bind(this, field.name)}>
            {field.options.map((option)=> <option value={option.id}>{option[field.optionLabelField]}</option>)}
          </Input>)
        break

      case 'number':
        return (<Input
          type={field.type}
          min={field.min}
          value={form[field.name]}
          label={field.label}
          ref={field.name}
          onChange={valueChange.bind(this, field.name)}/>)
        break

      case 'datepicker':
        return (<Datepicker
          selected={datepicker[field.name]}
          fieldName={field.name}
          onChange={dateChange.bind(this)}
          label={field.label}/>)
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
      case 'uploadFile':
        return (<UploadFile
          ref={field.name}
          files={field.files}
          help={field.help}
          onDeleteFile={deleteFile.bind(this)}
          fieldName={field.fieldName}
          multiple={field.multiple}
          label={field.label} />)
        break
    }
  }.bind(this))
}