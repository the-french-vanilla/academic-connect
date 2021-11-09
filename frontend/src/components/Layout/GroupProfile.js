import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class GroupProfile extends Component {
  render() {
    return (
      <div className="group-profile">
        <h1>Group Profile Page</h1>
      </div>
    );
  }
}

GroupProfile.propTypes = {

};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(GroupProfile);