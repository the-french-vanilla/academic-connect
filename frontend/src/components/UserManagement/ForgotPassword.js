import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class ForgotPassword extends Component {
  render() {
    return (
      <div className="forgot-password">
        ForgotPassword
      </div>
    );
  }
}

ForgotPassword.propTypes = {

};

const mapStateToProps = state => ({

});
export default connect(
  mapStateToProps,
)(ForgotPassword);