import apiAjax from "./api_actions"
import { pushPath } from 'redux-simple-router'

export function FetchUserJobs(params={}) {
  return apiAjax({
    action: "FETCH_USER_JOBS",
    url: "/api/jobs",
    params: params
  })
}

export function CreateJob(params) {
  return apiAjax({
    action: "CREATE_USER_JOB",
    verb: "POST",
    url: "/api/jobs",
    params: params,
    success: (dispatch) => { dispatch(pushPath("/jobs"))}
  })
}

export function DeleteJob(id) {
  return apiAjax({
    action: "DELETE_USER_JOB",
    verb: "DELETE",
    url: `/api/jobs/${id}`,
    success: (dispatch) => { dispatch({ type: "DELETE_USER_JOB_DONE", deletedId: id })}
  })
}

export function FetchJob(id) {
  return apiAjax({
    action: "FETCH_USER_JOB",
    verb: "GET",
    url: `/api/jobs/${id}`
  })
}