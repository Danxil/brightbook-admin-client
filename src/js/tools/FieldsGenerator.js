import React from 'react';
import {Input, Button, Col} from 'react-bootstrap';
import Datepicker from '../components/helpers/Datepicker.jsx';
import Colorpicker from '../components/helpers/Colorpicker.jsx';
import UploadImage from '../components/helpers/UploadImage.jsx';
import UploadFile from '../components/helpers/UploadFile.jsx';
import Tinymce from 'react-tinymce';
import _ from 'underscore';
import Constants from '../Constants.js';

export default function(obj, fields) {
  var {form, datepicker, selects} = obj

  function valueChange(fieldName) {
    this.setState(function(prev) {
      prev.form[fieldName] = this.refs[fieldName].getValue()

      return prev
    })
  }

  function arrayValueChange(array, index, fieldName) {
    this.setState(function(prev) {
      prev.form[array][index][fieldName] = this.refs[array + index + fieldName].getValue()

      return prev
    })
  }

  function addNewValue(array, fieldName) {
    this.setState(function(prev) {
      var val = {}
      val[fieldName] = ''

      prev.form[array].push(val)

      return prev
    })
  }

  function deleteValue(array, index) {
    this.setState(function(prev) {
      if (prev.form[array][index].id)
        prev.form[array][index].delete = true
      else
        prev.form[array].splice(index, 1)

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

  function colorChange(fieldName, color) {
    this.setState(function(prev) {
      prev.form[fieldName] = color.toHex()
    })
  }

  return fields.map(function(field) {
    switch (field.type) {
      case 'text':
        if (!field.array)
          return (<Input
            type={field.type}
            value={form[field.name]}
            label={field.label}
            ref={field.name}
            onChange={valueChange.bind(this, field.name)}/>)
        else {
          var fields = _.map(form[field.array], function(form, index) {
            if (form.delete)
              return

            return (
              <div className="form-group">
                <Input
                  type={field.type}
                  value={form[field.name]}
                  ref={field.array + index + field.name}
                  onChange={arrayValueChange.bind(this, field.array, index, field.name)}/>
                <Button onClick={deleteValue.bind(this, field.array, index)} bsStyle="danger">Delete</Button>
              </div>
            )
          }.bind(this))

          return (
            <div className="form-group">
              <div>
                <label>{field.label}</label>
              </div>
              {fields}
              <Button onClick={addNewValue.bind(this, field.array, field.name)}>Add new</Button>
            </div>
          )
        }
        break
      case 'email':
        if (!field.array)
          return (<Input
            type={field.type}
            value={form[field.name]}
            label={field.label}
            ref={field.name}
            onChange={valueChange.bind(this, field.name)}/>)
        else {
          var fields = _.map(form[field.array], function(form, index) {
            if (form.delete)
              return

            return (
              <div className="form-group">
                <Input
                  type={field.type}
                  value={form[field.name]}
                  ref={field.array + index + field.name}
                  onChange={arrayValueChange.bind(this, field.array, index, field.name)}/>
                <Button onClick={deleteValue.bind(this, field.array, index)} bsStyle="danger">Delete</Button>
              </div>
            )
          }.bind(this))

          return (
            <div className="form-group">
              <div>
                <label>{field.label}</label>
              </div>
              {fields}
              <Button onClick={addNewValue.bind(this, field.array, field.name)}>Add new</Button>
            </div>
          )
        }
        break
      case 'tel':
        if (!field.array)
          return (<Input
            type={field.type}
            value={form[field.name]}
            label={field.label}
            ref={field.name}
            onChange={valueChange.bind(this, field.name)}/>)
        else {
          var fields = _.map(form[field.array], function(form, index) {
            if (form.delete)
              return

            return (
              <div className="form-group">
                <Input
                  type={field.type}
                  value={form[field.name]}
                  ref={field.array + index + field.name}
                  onChange={arrayValueChange.bind(this, field.array, index, field.name)}/>
                <Button onClick={deleteValue.bind(this, field.array, index)} bsStyle="danger">Delete</Button>
              </div>
            )
          }.bind(this))

          return (
            <div className="form-group">
              <div>
                <label>{field.label}</label>
              </div>
              {fields}
              <Button onClick={addNewValue.bind(this, field.array, field.name)}>Add new</Button>
            </div>
          )
        }
        break
      case 'password':
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
          return (<div>
            <Input
              type={field.type}
              value={form[field.name] ? form[field.name].id : null}
              label={field.label}
              ref={field.name}
              onChange={selectChange.bind(this, field.name)}>
              {field.options.map((option)=> <option value={option.id}>{option[field.optionLabelField]}</option>)}
            </Input>
          </div>)
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
      case 'colorPicker':
        return (<Colorpicker
          color={field.color || '#fff'}
          name={field.name}
          label={field.label}
          onChange={colorChange.bind(this, field.name)}/>)
        break
    }
  }.bind(this))
}