import { combineReducers } from 'redux'
import currentUser from './current_user'

function history(state={}, action) {
  switch(action.type) {
    case "HISTORY_START":
      return Object.assign({}, state, { history: action.history });
    case "HISTORY_NAVIGATE":
      state.history.replaceState(null, action.url)
      return state;
    default:
      return state;
  }
}

export default combineReducers({ currentUser, history })
