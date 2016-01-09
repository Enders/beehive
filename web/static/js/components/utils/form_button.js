import React, { Component } from 'react'

export default class FormButton extends Component {
  render () {
    var { btnSize, btnType, btnSpinner } = this.props;
    var className = `btn ${ btnSize ? btnSize : ''} btn-${ btnType ? btnType : 'default' } { btnSpinner ? 'disabled' : ''}`
    return (
      <button className={className} disabled={btnSpinner} onClick={this.props.onClick}>
        { this.props.children }
      </button>
    )
  }
}