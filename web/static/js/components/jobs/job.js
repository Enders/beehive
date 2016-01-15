import React, { Component } from 'react'
import { connect } from 'react-redux'

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

class Job extends Component {

  deleteJob() {
    this.props.dispatch(DeleteJob(this.props.job.id))
  }

  render () {
    const { job } = this.props
    return (
      <tr>
        <td>
          {job.id}
        </td>
        <td>
          {job.created_at}
        </td>
        <td>
          <JobStatus maxRun={job.max_run}
                     runSummaries={job.run_summaries} />
        </td>
        <td>
          -
        </td>
        <td>
          <button className='btn btn-danger' onClick={this.deleteJob.bind(this)}>
            Delete
          </button>
        </td>
      </tr>
    )
  }
}

export default Job = connect()(Job)