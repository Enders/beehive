import jQuery from 'jquery'

export default function currentUser(state, action) {

  if(!state) {
    return {
      user: null,
      token: null
    }
  }

  switch(action.type) {
    case 'SIGN_UP_USER_DONE':
      return {...state, registrationStatus: "done"}

    case 'SIGN_UP_USER_FAILED':
      return {...state, registrationStatus: "failed", registrationErrors: action.errors}

    case 'SIGN_UP_USER_PENDING':
      return {...state, registrationStatus: "pending"}

    case 'SIGN_IN_USER_DONE':
      return {...state, user: action.user, token: action.token}

    case 'SIGN_IN_USER_PENDING':
      return {...state, signInStatus: "pending"}

    case 'SIGN_IN_USER_FAILED':
      return {...state, signInStatus: "failed", signInErrors: action.errors}

    case 'SIGN_OUT_USER':
      return {...state, signInStatus: null, user: null, token: null, signInErrors: null}

    default:
      return state;
  }
}