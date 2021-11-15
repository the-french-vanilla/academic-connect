import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class UserSettings extends Component {
  render() {
    return (
      <div className="user-settings">
        <h1>User Settings Page</h1>
        <h1>User Settings Page</h1>
        <h1>User Settings Page</h1>
        <h1>User Settings Page</h1>
        <h1>User Settings Page</h1>
      </div>
    );
  }
}

UserSettings.propTypes = {

};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(UserSettings);