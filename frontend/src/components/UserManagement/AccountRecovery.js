import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

// import "./forgotpassword.css";

class AccountRecovery extends Component {
  render() {
    return (
      <div className="box">
        <div className="inner-box">
            <u>
                <h3> Email Verification link!</h3>
            </u>
            <p style={{textAlign: 'center'}}> Email Verification link has been sent your given email address.</p>
            <br />
            <p style={{textAlign: 'center'}}> Go back to <Link to="/">Login page</Link></p>
        </div>
      </div>
    );
  }
}

AccountRecovery.propTypes = {

};

const mapStateToProps = state => ({

});
export default connect(
  mapStateToProps,
)(AccountRecovery);