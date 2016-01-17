import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { FetchJob } from 'actions/jobs'

class JobsShow extends Component {
  componentDidMount () {
    this.props.dispatch(FetchJob(this.props.params.id))
  }

  render () {
    var { fetchStatus, currentJob } = this.props
    var viewContent

    if(fetchStatus=="pending")
      viewContent = (
        <p class="alert alert-info">
          Please wait while the job details are loaded.
        </p>
      )
    else if(fetchStatus=="failed")
      viewContent = (
        <p class="alert alert-warning">
          Couldn't reatrieve the job details. Network error? Deleted job?
        </p>
      )
    else if(fetchStatus=="done")
      viewContent =  React.Children.map(this.props.children, function(child) {
            return React.cloneElement(child, { job: currentJob });
      });
    else
      viewContent = (
        <p class="alert alert-danger">
          No idea what's going on.
        </p>
      )

    return (
      <div id="user-job">
        <h1>
          Job {this.props.params.id}
          <Link to="/jobs">
            Return to list
          </Link>
        </h1>
        <Link to={"/jobs/"+this.props.params.id+"/results"}>
          Results
        </Link>
        {viewContent}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentJob: state.userJobs.currentJob,
    fetchStatus: (state.userJobs.currentJob||{}).fetchStatus
  }
}


export default JobsShow = connect(mapStateToProps)(JobsShow)