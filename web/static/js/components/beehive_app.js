import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import BootstrapLink from './utils/bootstrap_link.js'
import HeaderMenu from './user/header_menu'

class BeehiveApp extends Component {
  render () {

    const { loggedIn, currentUser } = this.props

    var menuItems, homeLink, rightMenuItems;

    if (loggedIn) {
      homeLink = "/jobs"
      menuItems = (
        <ul className="nav navbar-nav">
          <BootstrapLink to="/jobs">My Jobs</BootstrapLink>
          <BootstrapLink to="/compute">Compute</BootstrapLink>
        </ul>
      )
      rightMenuItems = (
        <li>
          <HeaderMenu user={currentUser} />
        </li>
      )
    } else {
      homeLink = "/home"
      menuItems = (
        <ul className="nav navbar-nav">
          <BootstrapLink to="/sign_up">Sign up</BootstrapLink>
          <BootstrapLink to="/sign_in">Sign in</BootstrapLink>
        </ul>
      )
    }

    return (
      <div id="beehive-app">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed"
                      data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                      aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to={ homeLink } className="navbar-brand">Beehive</Link>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              {menuItems}
            </div>
            <div className="nav navbar-nav navbar-right">
              {rightMenuItems}
            </div>
          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: !!state.currentUser.user,
    currentUser: state.currentUser.user
  }
}

export default BeehiveApp = connect(mapStateToProps, null)(BeehiveApp)