import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class UserProfile extends Component {
  render() {
    return (
      <div className="user-profile">
        <h1>User Profile Page</h1>
      </div>
    );
  }
}

UserProfile.propTypes = {

};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(UserProfile);