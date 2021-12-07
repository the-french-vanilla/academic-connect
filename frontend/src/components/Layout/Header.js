import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchUserProfiles } from "../../actions/userProfileActions";
import { logout } from "../../actions/securityActions";
import { withRouter } from 'react-router-dom';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: ""
    }

    this.search = this.search.bind(this);
    this.logout = this.logout.bind(this);
  }

  searchOnchange(e) {
    this.setState({ searchValue: e.target.value });
  }

  search(e) {
    e.preventDefault();

    this.props.history.push("/search/results/?q=" + this.state.searchValue);
    this.props.searchUserProfiles(this.state.searchValue);
    this.setState({ searchValue: "" });
  }

  logout() {
    this.props.logout();
    window.location.href = "/";
  }

  render() {
    const { validToken, user } = this.props.security;

    const userIsAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          {/* <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li> */}
          {/* <li className="nav-item">
              <Link className="nav-link" to="/feed">Notification <span className="sr-only">(current)</span></Link>
          </li> */}
          <li className="nav-item">
              {/* <span className="badge badge-pill badge-primary" style={{float:'right', marginBottom:'-10px'}}>1</span>  */}
              <Link className="nav-link" to="/messaging">Messaging <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/connections">
              Connections
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to="/pages">
              Pages
            </Link>
          </li> */}
          {/* <li className="nav-item">
            <Link className="nav-link" to="/groups">
              Groups
            </Link>
          </li> */}
          {/* <li className="nav-item">
            <Link className="nav-link" to="/events">
              Events
            </Link>
          </li> */}
        </ul>


        {/* <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> */}

        <form className="navbar-form navbar-right" role="search" id="navBarSearchForm" type="get" onSubmit={this.search}>
          <div className="input-group" id ="searchA">
            <input id="wish_title1" type="text" value={this.state.searchValue} 
              onChange={(e) => this.searchOnchange(e)} className="form-control" placeholder="Search" name="wish_title1" />
            <span className="input-group-btn">
              <button type="submit" disabled={this.state.searchValue === "" ? "disabled" : ""} className="btn btn-primary">
                <i className="glyphicon glyphicon-search"></i>Search
              </button>
            </span>
          </div>
        </form>

        <ul className="navbar-nav l-auto">
          <li className="nav-item">
            <Link className="nav-link" to={'/ac/' + user.username}>
              <i className="fas fa-user-circle mr-1" />
              {user.firstName + ' ' + user.lastName}
            </Link>
          </li>

          {/* <li className="nav-item">
            <Link
              className="nav-link"
              to="/logout"
              onClick={this.logout.bind(this)}
            >
              Logout
            </Link>
          </li> */}
        </ul>

        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fa fa-cog"></i>Settings
          </button>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
            {/* <button className="dropdown-item" type="button">
              <Link to="/settings">Privacy Settings</Link>
            </button> */}
            <button className="dropdown-item" type="button">
              <Link to="/settings">Manage Account</Link>
            </button>
            <button className="dropdown-item" type="button">
              <Link to="/logout" onClick={this.logout}>
                Logout
              </Link>
            </button>
          </div>
        </div>
      </div>
    );

    const userIsNotAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Sign Up
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li> */}
        </ul>
      </div>
    );

    let headerLinks;

    if (validToken && user) {
      headerLinks = userIsAuthenticated;
    } else {
      headerLinks = userIsNotAuthenticated;
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/feed">
            Academic Connect
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {headerLinks}
        </div>

        
      </nav>
    );

  }




  //   return (
  //     <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  //       <div className="container-fluid">
  //         <a className="navbar-brand">
  //           <Link to="/feed">Academic Connect</Link>
  //         </a>
  //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
  //           aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  //           <span className="navbar-toggler-icon"></span>
  //         </button>
  //         <div className="collapse navbar-collapse" id="navbarSupportedContent">
  //           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
  //             <li className="nav-item">
  //               <Link to="/feed">Home</Link>
  //             </li>
  //             <li className="nav-item">
  //               <a className="nav-link" href="#">Notification</a>
  //             </li>
  //             <li className="nav-item">
  //               <Link to="/ac/johndoe">Profile</Link>
  //             </li>
  //             <li className="nav-item">
  //               <Link to="/messaging/thread/1">Messaging</Link>
  //             </li>
  //             <form className="d-flex">
  //               <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
  //               <button className="btn btn-outline-success centre" type="submit">Search</button>
  //             </form>
  //           </ul>
          
  //         </div>
  //         <div className="dropdown">
  //           <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  //             <i className="fa fa-cog"></i>Settings
  //           </button>
  //           <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
  //             <button className="dropdown-item" type="button">
  //               <Link to="/settings">Privacy Settings</Link>
  //             </button>
  //             <button className="dropdown-item" type="button">
  //               <Link to="/settings">Manage Account</Link>
  //             </button>
  //             <button className="dropdown-item" type="button">
  //               <Link className="nav-link" to="/logout" onClick={this.logout}>
  //                 Logout
  //               </Link>
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </nav>
  //   );
  // }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  firstContactId: state.contactReducer.firstContactId,
});

export default withRouter(connect(
  mapStateToProps,
  { logout, searchUserProfiles }
)(Header));