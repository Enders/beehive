import _ from 'lodash'

function newExecutioner() {
  return {
    id: _.uniqueId("ex"),
    status: "waiting",
    currentJob: null
  }
}

function updateExecutioner(executioners, executionerId, update) {
  var executioner = _.detect(executioners, (executioner) => executioner.id == executionerId )
  executioners = _.without(executioners, executioner)
  executioner = {...executioner, ...update }
  executioners.push(executioner)
  return executioners
}

export default function jobExecutions(state, action) {
  if(!state) {
    return {
      executioners: []
    }
  }

  switch(action.type) {
    case 'EXECUTIONERS_ADD':
      return {...state, executioners: [...state.executioners, newExecutioner()] }

    case 'EXECUTIONERS_DELETE':
      return {...state, executioners: _.reject(state.executioners, (executioner) => executioner.id == action.executionerId )}

    case 'EXECUTION_REQUEST_DONE':
      var executioners = updateExecutioner(state.executioners, action.executionerId, { status: "running", currentJob: action.jobExecutionData, currentWorker: action.worker })
      return {...state, executioners: executioners}

    case 'EXECUTION_REQUEST_FAILED':
      var executioners = updateExecutioner(state.executioners, action.executionerId, { status: "request_failed" })
      return {...state, executioners: executioners}

    case 'EXECUTIONS_REQUEST_PENDING':
      var executioners = updateExecutioner(state.executioners, action.executionerId, { status: "request_pending" })
      return {...state, executioners: executioners}

    case 'EXECUTIONS_JOB_SUCCESS_PENDING':
      var executioners = updateExecutioner(state.executioners, action.executionerId, { status: "sending_pending", currentJob: null, currentWorker: null })
      return {...state, executioners: executioners}

    case 'EXECUTIONS_JOB_SUCCESS_FAILED':
      var executioners = updateExecutioner(state.executioners, action.executionerId, { status: "sending_failed", currentJob: null, currentWorker: null })
      return {...state, executioners: executioners}

    case 'EXECUTIONS_JOB_SUCCESS_DONE':
      var executioners = updateExecutioner(state.executioners, action.executionerId, { status: "waiting", currentJob: null, currentWorker: null })
      return {...state, executioners: executioners}

    default:
      return state;
  }
}