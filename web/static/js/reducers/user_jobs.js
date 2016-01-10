export default function userJobs(state, action) {
  if(!state) {
    return {
      jobs: []
    }
  }

  switch(action.type) {
    case 'FETCH_USER_JOBS_PENDING':
      return Object.assign({}, state, {fetchStatus: "pending"})

    case 'FETCH_USER_JOBS_DONE':
      return Object.assign({}, state, {fetchStatus: "done", jobs: action.data.jobs})

    case 'FETCH_USER_JOBS_FAILED':
      return Object.assign({}, state, {fetchStatus: "failed", fetchErrors: action.data.errors})

    default:
      return state;
  }
}