// import "phoenix_html"
// import socket from "./socket"
require('../less/app.less');

import React from 'react'
import ReactDOM from 'react-dom'

// React top level components
import BeehiveApp from './components/beehive_app'
import SignUp from './components/user/sign_up'
import SignIn from './components/user/sign_in'
import JobIndex from './components/jobs/job_index'
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
        <Route path="jobs" component={JobIndex}/>
        <Route path="jobs/new" component={JobNew}/>
        <Route path="run" component={JobExecutionIndex}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))

//Go back home until we can remember the token
store.dispatch(pushPath('/'))