import React, { Component } from 'react'

class Job extends Component {
  render () {
    const { job } = this.props
    return (
      <tr>
        <td>
          #{job.id}
        </td>
        <td>
          #{job.created_at}
        </td>
        <td>
          #{job.max_run}
        </td>
        <td>
          -
        </td>
        <td>
          -
        </td>
      </tr>
    )
  }
}