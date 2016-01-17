import _ from 'lodash'

export default function userJobs(state, action) {
  if(!state) {
    return {
      jobs: [],
      currentJob: null
    }
  }

  switch(action.type) {
    case 'FETCH_USER_JOBS_PENDING':
      return {...state, fetchStatus: "pending"}

    case 'FETCH_USER_JOBS_DONE':
      return {...state, fetchStatus: "done", jobs: action.data.jobs}

    case 'FETCH_USER_JOBS_FAILED':
      return {...state, fetchStatus: "failed", fetchErrors: action.data.errors}

    case 'DELETE_USER_JOB_DONE':
      const jobs = state.jobs.filter((job) => job.id != action.deletedId)
      return {...state, jobs: jobs}

    case 'FETCH_USER_JOB_PENDING':
      return {...state, currentJob: { fetchStatus: "pending" }}

    case 'FETCH_USER_JOB_DONE':
      return {...state, currentJob: {...action.data.job, fetchStatus: "done" }}

    case 'FETCH_USER_JOB_FAILED':
      return {...state, currentJob: {fetchStatus: "error" }}

    default:
      return state;
  }
}