// import "phoenix_html"
// import socket from "./socket"
require('../less/app.less');

import React from 'react'
import ReactDOM from 'react-dom'

// Login action
import { SignInUserDone } from "actions/user"

// React top level components
import BeehiveApp from './components/beehive_app'
import SignUp from './components/user/sign_up'
import SignIn from './components/user/sign_in'
import JobsIndex from './components/jobs/index/index'
import JobsShow from './components/jobs/show/show'
import JobsShowResults from './components/jobs/show/results'
import JobNew from './components/jobs/job_new'
import JobExecutionIndex from './components/job_executions/index'

// import Compute from './components/compute'
import Home from './components/home'

// React router
import { Router, IndexRoute, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { syncReduxAndRouter, routeReducer, pushPath } from 'redux-simple-router'

// Redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import beehiveReducer from './reducers/beehive'

const store = applyMiddleware(thunk)(createStore)(beehiveReducer)
const history = createBrowserHistory()

syncReduxAndRouter(history, store)

//No turning back.
ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={BeehiveApp}>
        <IndexRoute component={Home} />
        <Route path="sign_up" component={SignUp} />
        <Route path="sign_in" component={SignIn} />
        <Route path="home" component={Home} />
        <Route path="jobs" component={JobsIndex}/>
        <Route path="jobs/new" component={JobNew}/>
        <Route path="jobs/:id" component={JobsShow}>
          <IndexRoute component={JobsShowResults}/>
          <Route path="results" component={JobsShowResults}/>
        </Route>
        <Route path="run" component={JobExecutionIndex}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))

var {currentUser} = window;

if(currentUser){
  store.dispatch(SignInUserDone(currentUser.user, currentUser.token))
  store.dispatch(pushPath('/jobs'))
} else {
  store.dispatch(pushPath('/'))
}
