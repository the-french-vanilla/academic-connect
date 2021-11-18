import React, { Component } from "react";
import { createNewUser } from "../../actions/securityActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      gender: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    this.props.createNewUser(newUser, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div id="register-page">
        
      <div className="main">
      <div style={{height: '10vh'}}></div>
        <div className="title">SIGNUP FORM</div>
        <div className="container">
            <form onSubmit={this.onSubmit}>
                <div className="users">
                  <div className="input-box">
                        <span className="details">Username</span>
                        <input type="text" name="username" value={this.state.username} onChange={this.onChange} placeholder="Enter your Username" required />
                        {errors.username && (
                          <div className="invalid-feedback">{errors.username}</div>
                        )}
                    </div>
                    <div className="input-box">
                        <span className="details">First Name</span>
                        <input type="text" name="firstName" value={this.state.firstName} onChange={this.onChange} placeholder="Enter Your First Name" required />
                        {errors.firstName && (
                          <div className="invalid-feedback">{errors.firstName}</div>
                        )}
                    </div>
                    <div className="input-box">
                        <span className="details">Last Name</span>
                        <input type="text" name="lastName" value={this.state.lastName} onChange={this.onChange} placeholder="Enter Your Last Name" required />
                        {errors.lastName && (
                          <div className="invalid-feedback">{errors.lastName}</div>
                        )}
                    </div>
                    <div className="input-box">
                        <span className="details">Email</span>
                        <input type="email" name="email" value={this.state.email} onChange={this.onChange} placeholder="Enter your Email" required />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                    </div>
                    <div className="input-box">
                        <span className="details">Phone Number</span>
                        <input type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.onChange} placeholder="Enter your Phone Number" required />
                        {errors.phoneNumber && (
                          <div className="invalid-feedback">{errors.phoneNumber}</div>
                        )}
                    </div>
                    <div className="input-box">
                        <span className="details">Password</span>
                        <input type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="Enter your Password" required />
                        {errors.password && (
                          <div className="invalid-feedback">{errors.password}</div>
                        )}
                    </div>
                    <div className="input-box">
                        <span className="details">Confirm Password</span>
                        <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.onChange} placeholder="Confirm your Password" required />
                        {errors.confirmPassword && (
                          <div className="invalid-feedback">{errors.confirmPassword}</div>
                        )}
                    </div>
                </div>
                <div className="gender-info">
                    <input type="radio" name="gender" id="dot-1" />
                    <input type="radio" name="gender" id="dot-2" />
                    <span className="gender-title">Gender</span>
                    <div className="category">
                        <label for="dot-1">
                            <div className="dot one"></div>
                            <div className="gender">Male</div>
                        </label>
                        <label for="dot-2">
                            <div className="dot two"></div>
                            <div className="gender">Female</div>
                        </label>
                    </div>
                </div>
                <div className="button">
                    <input type="submit" value="Register" />
                    <Link to="/">
                      Back
                    </Link>
                </div>
            </form>
        </div>
    </div>
    </div>
    );

    {/* return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Email Address (Username)"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChange}
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onChange}
                  />
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                </div>
                
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    ); */}
  }
}

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security
});
export default connect(
  mapStateToProps,
  { createNewUser }
)(Register);