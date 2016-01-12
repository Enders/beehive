import jQuery from 'jquery'

export function AddExecutioner() {
  return {
    type: "EXECUTIONERS_ADD"
  }
}

export function DeleteExecutioner(executionerId) {
  return {
    type: "EXECUTIONERS_DELETE",
    executionerId: executionerId
  }
}

function JobCancelDone(executionerId) {
  return {
    type: "EXECUTION_CANCELLED",
    executionerId: executionerId
  }
}

export function CancelJobExecution(executionerId, exjobExecutionId) {
  return (dispatch) => {
    jQuery.ajax({
      url: `/api/job_executions/${jobExecutionId}`,
      type: "DELETE",
    }).done( (data) => dispatch(JobRequestDone(executionerId, data.job_execution)) )
      .error( (xhr) => dispatch(JobRequestFailed(executionerId)) )
  }
}

function JobRequestDone(executionerId, jobExecutionData) {
  return {
    type: "EXECUTION_REQUEST_DONE",
    executionerId: executionerId,
    jobExecutionData: jobExecutionData
  }
}

function JobRequestFailed(executionerId) {
  return {
    type: "EXECUTION_REQUEST_FAILED",
    executionerId: executionerId
  }
}

export function RequestJob(executionerId) {
  return (dispatch) => {
    dispatch({
      type: "EXECUTIONS_REQUEST_PENDING",
      executionerId: executionerId
    })

    jQuery.ajax({
      url: "/api/job_executions",
      type: "POST",
    }).done( (data) => dispatch(JobRequestDone(executionerId, data.job_execution)) )
      .error( (xhr) => dispatch(JobRequestFailed(executionerId)) )
  }
}