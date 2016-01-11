import _ from 'lodash'

export default function userJobs(state, action) {
  if(!state) {
    return {
      jobs: []
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

    default:
      return state;
  }
}