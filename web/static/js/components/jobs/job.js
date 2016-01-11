import React, { Component } from 'react'
import { connect } from 'react-redux'

import { DeleteJob } from 'actions/jobs'

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
          {job.max_run}
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