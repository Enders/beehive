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
      return Object.assign({}, state, {registrationStatus: "done"})

    case 'SIGN_UP_USER_FAILED':
      return Object.assign({}, state, {registrationStatus: "failed", registrationErrors: action.errors})

    case 'SIGN_UP_USER_PENDING':
      return Object.assign({}, state, {registrationStatus: "pending"})

    case 'SIGN_IN_USER_DONE':
      // Add the token info to all $.ajax queries
      jQuery.ajaxPrefilter(function( options ) {
        if ( !options.beforeSend) {
          options.beforeSend = function (xhr) {
            xhr.setRequestHeader('x-current-user', action.user.id);
            xhr.setRequestHeader('x-auth-token', action.token);
          }
        }
      });
      return Object.assign({}, state, {user: action.user, token: action.token})

    case 'SIGN_IN_USER_PENDING':
      return Object.assign({}, state, {signInStatus: "pending"})

    case 'SIGN_IN_USER_FAILED':
      return Object.assign({}, state, {signInStatus: "failed", signInErrors: action.errors})

    case 'SIGN_OUT_USER':
      return Object.assign({}, state, {signInStatus: null, user: null, token: null, signInErrors: null})

    default:
      return state;
  }
}