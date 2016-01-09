import React, { Component } from 'react'
import { connect } from 'react-redux'

import { SignUpUser } from 'actions/user'
import FormButton from 'components/utils/form_button'
import FormInput  from 'components/utils/form_input'

class SignUp extends Component {

  signUpParams() {
    return {
      user: {
        username: this.refs.username.value(),
        email: this.refs.email.value(),
        password: this.refs.password.value(),
        password_confirmation: this.refs.password_confirmation.value()
      }
    };
  }

  performSignUp() {
    this.props.dispatch(SignUpUser(this.signUpParams()))
  }

  render () {
    return (
      <div className="user-sign-up">
        <h1>Sign up!</h1>
        <div className="user-sign-up-form">
          <FormInput ref="username" placeholder="Username (public)" name="user[username]" field="username" errors={this.props.errors} />
          <FormInput ref="email" placeholder="Email" name="user[email]" className='form-control' type="email" field="email" errors={this.props.errors} />
          <FormInput ref="password" placeholder="Password (min 6 chars.)" name="user[password]" type="password" field="password" errors={this.props.errors} />
          <FormInput ref="password_confirmation" placeholder="Re-type your password" name="user[password_confirmation]" field="password_confirmation" type="password" errors={this.props.errors}/>
          <FormButton btnSpinner={this.props.pending} btnType="primary" onClick={() => { this.performSignUp() }}>
            Sign up
          </FormButton>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errors: (state.currentUser.registrationErrors || []),
    pending: state.currentUser.registrationStatus == "pending"
  }
}

export default SignUp = connect(mapStateToProps, null)(SignUp)