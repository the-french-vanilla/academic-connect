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
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      gender: "",
      errorMessage: "",
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

    let errorMessage = "";
    if (this.state.username.length < 6) {
      errorMessage = "Username must be at least 6 characters";
    } else if (this.state.firstName.length < 2) {
      errorMessage = "First name must be at least 2 characters";
    } else if (this.state.middleName.length > 0 && this.state.middleName.length < 2) {
      errorMessage = "Middle name must be at least 2 characters";
    } else if (this.state.lastName.length < 2) {
      errorMessage = "Last name must be at least 2 characters";
    } else if (this.state.password.length < 6) {
      errorMessage = "Password must be at least 6 characters";
    } else if (this.state.password !== this.state.confirmPassword) {
      errorMessage = "Password and confirm password does not match";
    } else if (this.state.gender === "") {
      errorMessage = "Gender is not selected";
    } else {
      const newUser = {
        username: this.state.username,
        firstName: this.state.firstName,
        middleName: this.state.middleName,
        lastName: this.state.lastName,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      };
      this.props.createNewUser(newUser, this.props.history);
    }
    if (errorMessage !== "") {
      this.setState({errorMessage: errorMessage});
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  genderChanged(e) {
    this.setState({ gender: e.target.value })
  }

  render() {
    const { errors, errorMessage } = this.state;

    return (
      <div id="register-page">
        
      <div className="main">
      <div style={{height: '10vh'}}></div>
        <Link style={{float: 'right'}} to="/">Back</Link>
        <div style={{height: '15px'}}></div>
        <div className="title">Signup</div>
        <div style={{color: 'red'}}>{errorMessage}</div>
        <div className="container">
            <form onSubmit={this.onSubmit}>
                <div className="users">
                  <div className="input-box">
                        <span className="details">Username</span>
                        <input type="text" name="username" value={this.state.username} onChange={this.onChange} placeholder="Enter your Username (at least 6 characters)" required />
                        {errors.username && (
                          <div className="invalid-feedback">{errors.username}</div>
                        )}
                    </div>
                    <div className="input-box">
                        <span className="details">First Name</span>
                        <input type="text" name="firstName" value={this.state.firstName} onChange={this.onChange} placeholder="Enter Your First Name (at least 2 characters)" required />
                        {errors.firstName && (
                          <div className="invalid-feedback">{errors.firstName}</div>
                        )}
                    </div>
                    <div className="input-box">
                        <span className="details">Middle Name (Optional)</span>
                        <input type="text" name="middleName" value={this.state.middleName} onChange={this.onChange} placeholder="Enter Your Middle Name (at least 2 characters)" />
                        {errors.middleName && (
                          <div className="invalid-feedback">{errors.middleName}</div>
                        )}
                    </div>
                    <div className="input-box">
                        <span className="details">Last Name</span>
                        <input type="text" name="lastName" value={this.state.lastName} onChange={this.onChange} placeholder="Enter Your Last Name (at least 2 characters)" required />
                        {errors.lastName && (
                          <div className="invalid-feedback">{errors.lastName}</div>
                        )}
                    </div>
                    <div className="input-box">
                        <span className="details">Email</span>
                        <div style={{height: '10px'}}></div>
                        <input type="email" name="email" value={this.state.email} onChange={this.onChange} style={{width: '100%'}} placeholder="Enter your Email" required />
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
                        <input type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="Enter your Password (at least 6 characters)" required />
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
                    {/* <input type="radio" name="gender" id="dot-1" />
                    <input type="radio" name="gender" id="dot-2" /> */}

                    <input type="radio" name="gender" id="dot-1"
                                   value="M"
                                   checked={this.state.gender === 'M'} 
                                   onChange={(e) => this.genderChanged(e)} />
                    <input type="radio" name="gender" id="dot-2"
                                   value="F"
                                   checked={this.state.gender === 'F'} 
                                   onChange={(e) => this.genderChanged(e)} />
                    <input type="radio" name="gender" id="dot-3"
                                   value="U"
                                   checked={this.state.gender === 'U'} 
                                   onChange={(e) => this.genderChanged(e)} />

                    <span className="gender-title">Gender</span>
                    <div className="category">
                        <label htmlFor="dot-1">
                            <div className="dot onebutton"></div>
                            <div className="gender">Male</div>
                        </label>
                        <label htmlFor="dot-2">
                            <div className="dot twobutton"></div>
                            <div className="gender">Female</div>
                        </label>
                        <label htmlFor="dot-3">
                            <div className="dot threebutton"></div>
                            <div className="gender">Unidentified</div>
                        </label>
                    </div>
                </div>
                <div className="button">
                    <input type="submit" value="Register" />
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