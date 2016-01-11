import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { FetchUserJobs } from 'actions/jobs'
import JobList from './job_list'

class JobIndex extends Component {
  componentDidMount () {
    this.props.dispatch(FetchUserJobs())
  }

  render () {
    return (
      <div id="user-jobs">
        <h1>
          My Jobs
          <Link to="/jobs/new" className='btn btn-sm btn-primary'>
            <span className="glyphicon glyphicon-plus"></span>
            Create a new job
          </Link>
        </h1>
        <JobList />
      </div>
    )
  }
}

export default JobIndex = connect()(JobIndex)