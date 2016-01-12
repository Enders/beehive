import React, { Component } from 'react'
import { connect } from 'react-redux'

import { AddExecutioner } from 'actions/job_executions'
import Executioner from './executioner'

class JobExecutionsIndex extends Component {
  addExecutioner () {
    this.props.dispatch(AddExecutioner())
  }

  render () {
    var { executioners } = this.props

    var addRunnerButton
    if(executioners.length < 3) {
      addRunnerButton = (<button className='btn btn-primary'
                                 onClick={this.addExecutioner.bind(this)}>
                          <span className="glyphicon glyphicon-plus"></span>
                          Add runner
                        </button>)
    }

    return (
      <div id="user-jobs">
        <h1>
          Run jobs
          {addRunnerButton}
        </h1>
        <ul className="list-unstyled list-inline job-runners">
          { executioners.map( (executioner ) => {
            return (<Executioner key={executioner.id} executioner={executioner} />)
          }) }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    executioners: (state.jobExecutions.executioners || []),
  }
}

export default JobExecutionsIndex = connect(mapStateToProps)(JobExecutionsIndex)