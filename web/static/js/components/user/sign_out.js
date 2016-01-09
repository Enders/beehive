import React, { Component } from 'react'
import { connect } from 'react-redux'

import { SignOutUser } from "actions/user"
import { Navigate } from "actions/history"

class SignOut extends Component {

  signOut () {
    this.props.dispatch(SignOutUser())
    this.props.dispatch(Navigate("/home"))
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