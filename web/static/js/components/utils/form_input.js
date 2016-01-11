import React, { Component } from 'react'
import _ from 'lodash'

export default class FormInput extends Component {

  value() {
    return this.refs.input.value;
  }

  render () {
    const { type, name, placeholder, errors, field, defaultValue, label } = this.props
    const errorText = (_.detect(errors, (error) => error.field == field)||{}).detail
    const hasError = !!errorText;
    const className = `form-group ${hasError ? 'has-error' : ''}`

    var helpText = null
    if(hasError) {
      helpText = (<span className="help-block">
        {errorText}
      </span>)
    }

    var labelElement
    if(!!label) {
      labelElement = (
        <label>{label}</label>
      )
    }

    var inputElement
    if(type == "textarea") {
      inputElement = (
        <textarea ref="input"
          className="form-control"
          name={ name }
          placeholder={ placeholder }>{defaultValue}</textarea>
      )
    } else {
      inputElement = (
        <input ref="input"
          className="form-control"
          type={ type || "text" }
          name={ name }
          defaultValue={ defaultValue }
          placeholder={ placeholder }/>
      )
    }

    return (
      <div className={className}>
        {labelElement}
        {inputElement}
        {helpText}
      </div>
    )
  }
}