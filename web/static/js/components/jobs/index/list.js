import React, { Component } from 'react'
import { connect } from 'react-redux'

import JobsIndexJob from './job'

class JobsIndexList extends Component {
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
      <ul className="list-unstyled list-inline jobs">
        {jobs.map( (job) => {
            return (<JobsIndexJob key={job.id} job={job} />)
          })}
      </ul>
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

export default JobsIndexList = connect(mapStateToProps, null)(JobsIndexList)