import React, { Component } from 'react'

import { Link } from 'react-router'

export default class BootstrapLink extends Component {
  render () {
    var isActive = this.context.history.isActive(this.props.to, this.props.params, this.props.query);
    var className = isActive ? 'active' : '';
    return (
      <li className={className}>
        <Link {...this.props} />
      </li>
    )
  }
}

BootstrapLink.contextTypes = {
  history: React.PropTypes.object
};