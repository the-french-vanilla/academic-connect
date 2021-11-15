import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import "./forgotpassword.css";

class ForgotPassword extends Component {
  render() {
    return (
      <div className="forgot-password">
        <u>
            <h1>FORGOT PASSWORD</h1>
        </u>
        <div className="box">
            <u>
                <h2>Enter Your Email Address</h2>
            </u>
            <div className="inner-box">
                <form action="recover.html">
                    <input type="email" placeholder="Enter your Email Address" />
                    <input type="submit" value="Send Link" />
                </form>
            </div>
        </div>
        <Link to="/">
          Back
        </Link>
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