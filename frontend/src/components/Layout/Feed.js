import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Feed extends Component {
  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="feeds">
        <h1>Feed Page</h1>
        {/* <div className="light-overlay landing-inner text-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">
                  Personal Project Management Tool
                </h1>
                <p className="lead">
                  Create your account to join active projects or start your own
                </p>
                <hr />
                <Link className="btn btn-lg btn-primary mr-2" to="/register">
                  Sign Up
                </Link>
                <Link className="btn btn-lg btn-secondary mr-2" to="/login">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

Feed.propTypes = {

};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(Feed);