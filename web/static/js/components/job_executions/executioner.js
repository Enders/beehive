import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { DeleteExecutioner, RequestJob } from 'actions/job_executions'

class Executioner extends Component {
  deleteExecutioner () {
    this.props.dispatch(DeleteExecutioner(this.props.executioner.id))
  }

  requestJob () {
    this.props.dispatch(RequestJob(this.props.executioner.id))
  }

  render () {
    var { executioner } = this.props
    var status, actions

    if(executioner.status=="running") status = "Running"
    if(executioner.status=="waiting") status = "Idle"
    if(executioner.status=="request_pending") status = "Hunting"
    if(executioner.status=="request_failed") status = "No jobs available"
    if(executioner.status=="sending_pending") status = "Sending result"
    if(executioner.status=="sending_failed") status = "Failed to send result"

    if(executioner.status=="waiting"||executioner.status=="request_failed"||executioner.status=="sending_failed") {
      actions = (
        <span>
          <button className="btn btn-danger btn-xs" onClick={this.requestJob.bind(this)}>
            <span className="glyphicon glyphicon-refresh"></span>
            Job hunt
          </button>
          <button className="btn btn-danger btn-xs" onClick={this.deleteExecutioner.bind(this)}>
            <span className="glyphicon glyphicon-trash"></span>
            Remove
          </button>
        </span>
      )
    }

    return (
      <li>
        <span>{status}</span>
        {actions}
      </li>
    )
  }
}

export default Executioner = connect()(Executioner)