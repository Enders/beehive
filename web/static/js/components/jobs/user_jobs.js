import React, { Component } from 'react'
import { connect } from 'react-redux'

import { FetchUserJobs } from 'actions/jobs'
import JobList from './job_list'

class UserJobs extends Component {
  componentDidMount () {
    this.props.dispatch(FetchUserJobs())
  }

  render () {
    return (
      <div id="user-jobs">
        <h1>My Jobs</h1>
        <JobList />
      </div>
    )
  }
}

export default UserJobs = connect()(UserJobs)