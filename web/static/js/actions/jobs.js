import apiAjax from "./api_actions"

export function FetchUserJobs(params={}) {
  return apiAjax({
    action: "FETCH_USER_JOBS",
    url: "/api/jobs",
    params: params
  })
}