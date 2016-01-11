import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CreateJob } from 'actions/jobs'

import FormInput  from 'components/utils/form_input'
import FormButton from 'components/utils/form_button'

class JobNew extends Component {

  createJob() {
    this.props.dispatch(CreateJob(this.jobParams()))
  }

  jobParams() {
    return {
      job: {
        payload: this.refs.payload.value(),
        max_run: this.refs.max_run.value()
      }
    }
  }

  render () {
    return (
      <div className="new-job">
        <h1>Create a new job</h1>

        <FormInput ref="max_run" type="numeric"
                   defaultValue="1" label="How many times should this job run?"
                   name="job[max_run]" field="max_run"
                   errors={this.props.errors} />
        <FormInput ref="payload" type="textarea"
                   label="Enter JS code, don't forget to call done(theResult)!"
                   name="job[payload]" className='form-control'
                   field="payload" errors={this.props.errors} />
        <FormButton btnSpinner={this.props.pending} btnType="primary" onClick={() => { this.createJob() }}>
          Create
        </FormButton>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errors: (state.userJobs.createStatus || []),
    pending: state.userJobs.createStatus == "pending"
  }
}

export default JobNew = connect(mapStateToProps)(JobNew)