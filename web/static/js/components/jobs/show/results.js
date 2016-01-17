import React, { Component } from 'react'
import { connect } from 'react-redux'

class JobExecution extends Component {
  render() {
    var { execution } = this.props

    var status
    if(execution.status=="completed")
      status= (<span className="label label-success">Completed</span>)
    else if(execution.status=="failed")
      status= (<span className="label label-danger">Failed</span>)
    else
      status= (<span className="label label-warning">Pending</span>)

    var result
    if(execution.status=="completed")
      result = (<span className="text-muted">{JSON.stringify(execution.result)}</span>)
    else
      result = (<span className="text-muted">-</span>)

    return (
      <tr>
        <td>{execution.inserted_at}</td>
        <td></td>
        <td>{status}</td>
        <td>{result}</td>
      </tr>
    )
  }
}

export default class JobsShowResults extends Component {
  render () {
    var { job } = this.props
    return (
      <div id="user-job-results">
        <h2>Results</h2>
        <table className='table table-condensed'>
          <thead>
            <tr>
              <th>Started</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
          { job.executions.map( (execution) => {
            return (<JobExecution execution={execution} />)
          })}
          </tbody>
        </table>
      </div>
    )
  }
}