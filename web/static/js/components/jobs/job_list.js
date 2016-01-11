import React, { Component } from 'react'
import { connect } from 'react-redux'

import Job from './job'

class JobList extends Component {
  render () {
    const { jobs, noJobs, fetchError, fetching } = this.props;

    if(fetchError) {
      return (
        <p className="alert alert-danger">
          There was an issue fetching your list of jobs. Sorry. We are probably fixing it as you read this.
        </p>
      )
    }

    if(fetching) {
      return (
        <p className="alert alert-info">
          Retrieving your jobs... Wait a minute!
        </p>
      )
    }

    if(noJobs) {
      return (
        <p className="alert alert-info">
          Looks like you haven't submitted any jobs yet.
        </p>
      )
    }

    return (
      <table className="table table-condensed table-striped">
        <thead>
          <tr>
            <th>Job id</th>
            <th>Creation date</th>
            <th>Current status</th>
            <th>Results</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {jobs.map( (job) => {
            return (<Job key={job.id} job={job} />)
          })}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: (state.userJobs.jobs || []),
    noJobs: (state.userJobs.jobs || []).length == 0,
    fetchError: state.userJobs.fetchStatus == "failed",
    fetching: state.userJobs.fetchStatus == "pending",
  }
}

export default JobList = connect(mapStateToProps, null)(JobList)