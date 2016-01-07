import "phoenix_html"
import socket from "./socket"

require('./app.less');

import React from 'react'
import ReactDOM from 'react-dom'
import BeehiveApp from './components/beehive_app'

ReactDOM.render(<BeehiveApp />, document.getElementById('root'))