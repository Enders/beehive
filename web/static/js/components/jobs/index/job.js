import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { DeleteJob } from 'actions/jobs'

import _ from 'lodash'

class JobStatus extends Component {

  countFor(summaries, status) {
    var summary = _.detect(summaries, (summary) => summary[0] == status)
    return !summary ? 0 : summary[1]
  }

  render() {

    const { maxRun, runSummaries } = this.props

    var completedRuns = this.countFor(runSummaries, "completed")
    var timedoutRuns = this.countFor(runSummaries, "timedout")
    var pendingRuns = this.countFor(runSummaries, "pending")

    var labelText = "Waiting"
    var labelColor = "default"

    if(completedRuns >= maxRun) {
      labelColor = "success"
      labelText = "Completed"
    } else if(pendingRuns > 0) {
      labelColor = "warning"
      labelText = "Running"
    } else if(timedoutRuns > 0) {
      labelColor = "danger"
      labelText = "Timed out"
    }

    return (
      <span className={ "label label-" + labelColor }>
        { labelText }
      </span>
    )
  }
}

class JobsIndexJob extends Component {

  deleteJob() {
    this.props.dispatch(DeleteJob(this.props.job.id))
  }

  render () {
    const { job } = this.props
    return (
      <li>
        <Link to={"/jobs/" + this.props.job.id }>
          {job.id}, {job.created_at}
        </Link>

        <JobStatus maxRun={job.max_run}
                   runSummaries={job.run_summaries} />

        <button className='btn btn-danger' onClick={this.deleteJob.bind(this)}>
          Delete
        </button>
      </li>
    )
  }
}

export default JobsIndexJob = connect()(JobsIndexJob)