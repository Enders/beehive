import jQuery from 'jquery'

import { pushPath } from 'redux-simple-router'

function SignUpUserDone() {
  return {
    type: "SIGN_UP_USER_DONE"
  }
}

function SignUpUserFailed(errors) {
  return {
    type: "SIGN_UP_USER_FAILED",
    errors: errors
  }
}

export function SignInUserDone(user, token) {
  return {
    type: "SIGN_IN_USER_DONE",
    user: user,
    token: token
  }
}

function SignInUserFailed(errors) {
  return {
    type: "SIGN_IN_USER_FAILED",
    errors: errors
  }
}

export function SignOutUser(){
  return {
    type: "SIGN_OUT_USER"
  }
}

export function SignUpUser(params) {
  return function(dispatch) {
    dispatch({
      type: "SIGN_UP_USER_PENDING"
    })
    jQuery.ajax({
      url: "/registration",
      type: "POST",
      data: params,
      dataType: "json"
    }).done( (data) => {
      dispatch(SignUpUserDone())
      dispatch(SignInUserDone(data.user, data.token))
      dispatch(pushPath('/jobs'));
    }).error( (xhr) => dispatch(SignUpUserFailed(xhr.responseJSON.errors)))
  }
}

export function SignInUser(params) {
  return function(dispatch) {
    dispatch({
      type: "SIGN_IN_USER_PENDING"
    })
    jQuery.ajax({
      url: "/session",
      type: "POST",
      data: params,
      dataType: "json"
    }).done( (data) => {
      dispatch(SignInUserDone(data.user, data.token))
      dispatch(pushPath('/jobs'));
    }).error( (xhr) => dispatch(SignInUserFailed(xhr.responseJSON.errors)) )
  }
}