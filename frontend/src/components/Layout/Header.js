import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";

class Header extends Component {
  constructor() {
    super();

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
    window.location.href = "/";
  }

  render() {
    const { validToken, user } = this.props.security;

    // const userIsAuthenticated = (
    //   <div className="collapse navbar-collapse" id="mobile-nav">
    //     <ul className="navbar-nav mr-auto">
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/dashboard">
    //           Dashboard
    //         </Link>
    //       </li>
    //     </ul>

    //     <ul className="navbar-nav ml-auto">
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/dashboard">
    //           <i className="fas fa-user-circle mr-1" />
    //           {user.fullName}
    //         </Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link
    //           className="nav-link"
    //           to="/logout"
    //           onClick={this.logout.bind(this)}
    //         >
    //           Logout
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    // );

    // const userIsNotAuthenticated = (
    //   <div className="collapse navbar-collapse" id="mobile-nav">
    //     <ul className="navbar-nav ml-auto">
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/register">
    //           Sign Up
    //         </Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/login">
    //           Login
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    // );

    // let headerLinks;

    // if (validToken && user) {
    //   headerLinks = userIsAuthenticated;
    // } else {
    //   headerLinks = userIsNotAuthenticated;
    // }

    // return (
    //   <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
    //     <div className="container">
    //       <Link className="navbar-brand" to="/">
    //         Personal Project Management Tool
    //       </Link>
    //       <button
    //         className="navbar-toggler"
    //         type="button"
    //         data-toggle="collapse"
    //         data-target="#mobile-nav"
    //       >
    //         <span className="navbar-toggler-icon" />
    //       </button>
    //       {headerLinks}
    //     </div>
    //   </nav>
    // );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="#">Academic Connect</a> */}
          <a className="navbar-brand">
            <Link to="/feed">Academic Connect</Link>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
                <Link to="/feed">Home</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Notification</a>
              </li>
              <li className="nav-item">
                <Link to="/ac/johndoe">Profile</Link>
              </li>
              <li className="nav-item">
                <Link to="/messaging/thread/1">Messaging</Link>
              </li>
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success centre" type="submit">Search</button>
              </form>
            </ul>
          
          </div>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fa fa-cog"></i>Settings
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
              {/* 
              <button className="dropdown-item" type="button">Privacy Settings</button> 
              <button className="dropdown-item" type="button">Manage Account</button>
              <button className="dropdown-item" type="button">Log Out</button>
              */}
              <button className="dropdown-item" type="button">
                <Link to="/settings">Privacy Settings</Link>
              </button>
              <button className="dropdown-item" type="button">
                <Link to="/settings">Manage Account</Link>
              </button>
              <button className="dropdown-item" type="button">
                <Link className="nav-link" to="/logout" onClick={this.logout}>
                  Logout
                </Link>
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);