import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import currentUser from './current_user'
import userJobs from './user_jobs'

export default combineReducers({ currentUser, userJobs, routing: routeReducer })
