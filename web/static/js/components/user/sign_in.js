import React, { Component } from 'react'
import { connect } from 'react-redux'

import { SignInUser } from 'actions/user'
import FormButton from 'components/utils/form_button'
import FormInput  from 'components/utils/form_input'

class SignIn extends Component {

  signInParams() {
    return {
      session: {
        email: this.refs.email.value(),
        password: this.refs.password.value(),
      }
    };
  }

  performSignIn() {
    this.props.dispatch(SignInUser(this.signInParams()))
  }

  render () {
    return (
      <div className="user-sign-up">
        <h1>Sign in!</h1>
        <div className="user-sign-up-form">
          <FormInput ref="email" placeholder="Email" name="session[email]" className='form-control' type="email" field="email" errors={this.props.errors} />
          <FormInput ref="password" placeholder="Password" name="session[password]" type="password" field="password" errors={this.props.errors} />
          <FormButton btnSpinner={this.props.pending} btnType="primary" onClick={() => { this.performSignIn() }}>
            Sign in
          </FormButton>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errors: (state.currentUser.signInErrors || []),
    pending: state.currentUser.signInStatus == "pending"
  }
}

export default SignIn = connect(mapStateToProps, null)(SignIn)