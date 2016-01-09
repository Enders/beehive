// import "phoenix_html"
// import socket from "./socket"
require('./app.less');

import React from 'react'
import ReactDOM from 'react-dom'

// React top level components
import BeehiveApp from './components/beehive_app'
import SignUp from './components/user/sign_up'
import SignIn from './components/user/sign_in'
import Submit from './components/submit'
import Compute from './components/compute'
import Home from './components/home'

// Redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import beehiveReducer from './reducers/beehive'
const store = applyMiddleware(thunk)(createStore)(beehiveReducer);

// React router
import { Router, IndexRoute, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
const history = createBrowserHistory()

//Things are getting serious
store.dispatch({
  type: "HISTORY_START",
  history: history
})

//No turning back.
ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={BeehiveApp}>
        <IndexRoute component={Home} />
        <Route path="sign_up" component={SignUp} />
        <Route path="sign_in" component={SignIn} />
        <Route path="home" component={Home} />
        <Route path="submit" component={Submit} />
        <Route path="compute" component={Compute} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))