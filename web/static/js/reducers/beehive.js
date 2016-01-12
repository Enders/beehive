import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import currentUser from './current_user'
import userJobs from './user_jobs'
import jobExecutions from './job_executions'

export default combineReducers({ currentUser, userJobs, jobExecutions, routing: routeReducer })
