import React, { Component } from 'react'

import SignOut from './sign_out'

export default class HeaderMenu extends Component {
  render () {

    const { user } = this.props;

    return (
      <div className='current-user-menu'>
        Welcome {user.username}!
        <SignOut />
      </div>
    )
  }
}