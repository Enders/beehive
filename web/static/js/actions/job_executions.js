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

function JobExecutionSuccessDone(executionerId) {
  return {
    type: "EXECUTIONS_JOB_SUCCESS_DONE",
    executionerId: executionerId
  }
}

function JobExecutionSuccessFailed(executionerId) {
  return {
    type: "EXECUTIONS_JOB_SUCCESS_FAILED",
    executionerId: executionerId
  }
}

function JobExecutionSuccess(executionerId, jobExecutionId, result) {
  return (dispatch) => {
    dispatch({
      type: "EXECUTIONS_JOB_SUCCESS_PENDING",
      executionerId: executionerId
    })
    jQuery.ajax({
      url: `/api/job_executions/${jobExecutionId}`,
      type: "PUT",
      data: { job_execution: { status: "ok", result: result } }
    }).done( (data) => dispatch(JobExecutionSuccessDone(executionerId)) )
      .error( (xhr) => dispatch(JobExecutionSuccessFailed(executionerId)) )
  }
}

function JobRequestDone(dispatch, executionerId, jobExecutionData) {
  const worker = new Worker(jobExecutionData.job.payload_url)

  worker.addEventListener('message', (event) => {
    var { status, details } = event.data;
    if(status=="ok") {
      dispatch(JobExecutionSuccess(executionerId, jobExecutionData.id, details))
    } else {
      dispatch(JobExecutionFailed(executionerId, jobExecutionData.id, details))
    }
  }, false)

  worker.postMessage({command: 'start'});

  return {
    type: "EXECUTION_REQUEST_DONE",
    worker: worker,
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
    }).done( (data) => dispatch(JobRequestDone(dispatch, executionerId, data.job_execution)) )
      .error( (xhr) => dispatch(JobRequestFailed(executionerId)) )
  }
}