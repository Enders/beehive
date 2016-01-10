import React, { Component } from 'react'
import { connect } from 'react-redux'

import { SignOutUser } from "actions/user"
import { pushPath } from 'redux-simple-router'

class SignOut extends Component {

  signOut () {
    this.props.dispatch(SignOutUser())
    this.props.dispatch(pushPath("/home"))
  }

  render () {
    return (
      <button className="btn btn-xs btn-default"
              onClick={this.signOut.bind(this, null)}>
        Sign out
      </button>
    )
  }
}

export default SignOut = connect()(SignOut)