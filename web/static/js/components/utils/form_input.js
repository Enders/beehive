import React, { Component } from 'react'
import _ from 'lodash'

export default class FormInput extends Component {

  value() {
    return this.refs.input.value;
  }

  render () {
    const { type, name, placeholder, errors, field } = this.props
    const errorText = (_.detect(errors, (error) => error.field == field)||{}).detail
    const hasError = !!errorText;
    const className = `form-group ${hasError ? 'has-error' : ''}`

    var helpText = null
    if(hasError) {
      helpText = (<span className="help-block">
        {errorText}
      </span>)
    }

    return (
      <div className={className}>
        <input ref="input"
               className="form-control"
               type={ type || "text" }
               name={ name }
               placeholder={ placeholder }/>
        {helpText}
      </div>
    )
  }
}