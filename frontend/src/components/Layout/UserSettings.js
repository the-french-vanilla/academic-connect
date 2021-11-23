import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class UserSettings extends Component {
  render() {
    return (
      <div className="user-settings">
        <div style={{height: '10vh'}}></div>
        <div className="container">
          <h2>User Settings</h2>
          <div className="row">
            <div className="col-8">
            <form>
              <div className="form-group">
                <label for="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" aria-describedby="firstNameHelp" placeholder="Enter first name" />
                <small id="firstNameHelp" className="form-text text-muted">First name</small>
              </div>
              <div className="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" className="form-control" id="lastName" aria-describedby="lastNameHelp" placeholder="Enter last name" />
                <small id="lastNameHelp" className="form-text text-muted">Last name</small>
              </div>
              <div className="form-group">
                <label for="email">Email</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">Email.</small>
              </div>
              <div className="form-group">
                <label for="changePassword">Change Password</label>
                <input type="password" className="form-control" id="changePassword" placeholder="Change Password" />
              </div>
              <div className="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" />
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
            </div>
            <div className="col-4"></div>
          </div>
        </div>
        
      </div>
    );
  }
}

UserSettings.propTypes = {

};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(UserSettings);