import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { login } from "../../actions/securityActions";
import PropTypes from "prop-types";

import frontV3 from '../../static/image/frontV3.png';

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/feed");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.security.validToken) {
      this.props.history.push("/feed");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const LoginRequest = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.login(LoginRequest);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  render() {
    const { errors } = this.state;
    return (
      <div id="landing-page">
        <div style={{height: '10vh'}}></div>
        <div className="wrapper">
          <div className="one">  
              <img src={ frontV3 } alt="hello world" />
          </div>
          <div className="two">
              <h1><b>Academic Connect</b></h1>
              <h4><b>Connect with professors, researchers, and scholars in the academia.</b></h4>

              <form onSubmit={this.onSubmit} method="post">
                  <label htmlFor="username"><b>Username</b></label>
                  <input type="text" placeholder="Enter Username" name="username" value={this.state.username}
                    onChange={this.onChange} required />

                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}

                  <label htmlFor="password"><b>Password</b></label>
                  <input type="password" placeholder="Enter Password" name="password" value={this.state.password}
                    onChange={this.onChange} required />

                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}

                  <button type="submit">Login</button>
              </form>

              <Link to="/register">
                  Sign Up
                </Link><br />
                <Link to="/forgotpassword">
                  Forgot Password
                </Link>
            </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { login }
)(Landing);