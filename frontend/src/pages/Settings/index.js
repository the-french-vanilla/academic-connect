import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateCurrentUser } from "../../actions/securityActions";

import axios from "axios";

class Settings extends Component {
  constructor() {
    super();
    // this.state = {
    //   username: this.props.currentUser.username,
    //   firstName: this.props.currentUser.firstName,
    //   middleName: this.props.currentUser.middleName,
    //   lastName: this.props.currentUser.lastName,
    //   email: this.props.currentUser.email,
    //   phoneNumber: this.props.currentUser.phoneNumber,
    //   password: this.props.currentUser.password,
    //   confirmPassword: this.props.currentUser.confirmPassword,
    //   gender: this.props.currentUser.gender,
    //   // profilePicture: this.props.profilePicture,
    // };
    this.state = {
      username: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      gender: "",
      profilePicture: null,
      errorMessage: "",
      errorMessageChangeProfilePicture: "",
      errorMessageChangePassword: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitChangeProfilePicture = this.onSubmitChangeProfilePicture.bind(this);
    this.onSubmitChangePassword = this.onSubmitChangePassword.bind(this);
  }

  getCurrentUser = async () => {
    const res = await axios.get("http://localhost:8081/api/users");
    return res.data;
  }

  componentDidMount() {
    // this.props.getCurrentUser();

    this.getCurrentUser().then(currentUser => {
      this.setState({
        "username": currentUser.username,
        "firstName": currentUser.firstName,
        "middleName": currentUser.middleName,
        "lastName": currentUser.lastName,
        "email": currentUser.email,
        "phoneNumber": currentUser.phoneNumber,
        "gender": currentUser.gender,
        "profilePicture": currentUser.profilePicture,
      });
    });

    //console.log(currentUser)

    // this.setState({
    //   "username": currentUser.username,
    //   "firstName": currentUser.firstName,
    //   "lastName": currentUser.lastName,
    //   "email": currentUser.email,
    //   "phoneNumber": currentUser.phoneNumber,
    //   "password": currentUser.password,
    //   "gender": currentUser.gender,
    //   "profilePicture": currentUser.profilePicture,
    // });

    // "username": "johndoe",
    // "firstName": "John",
    // "lastName": "Doe",
    // "email": "johndoe@gmail.com",
    // "phoneNumber": "1234567",
    // "password": "$2a$10$ByZ1jj8KMuCidyiBfIPdBOEIPoLqLQYsPwmEwLJ1zDXQdg.i3uGzK",
    // "confirmPassword": null,
    // "gender": null,
    // "profilePicture": "andreas.jpg",
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
    } else if (this.state.gender === "") {
      errorMessage = "Gender is not selected";
    } else {
      // Create an object of formData
      const formData = new FormData();
      formData.append("username", this.state.username);
      formData.append("firstName", this.state.firstName);
      formData.append("middleName", this.state.middleName);
      formData.append("lastName", this.state.lastName);
      formData.append("email", this.state.email);
      formData.append("phoneNumber", this.state.phoneNumber);
      formData.append("gender", this.state.gender);
      this.props.updateCurrentUser(formData);
    }
    if (errorMessage !== "") {
      this.setState({errorMessage: errorMessage});
    } else {
      this.setState({errorMessage: ""});
    }

    // const PostRequest = {
    //   postId: 1,
    //   text: this.state.text,
    //   reaction: 'test',
    //   deleted: false
    // };
    
    // const { match } = this.props;

    // this.props.createNewPost(PostRequest, match.params.username);

    // this.setState({
    //   text: ""
    // });

    // window.location.href = "/";
  }

  onSubmitChangeProfilePicture(e) {
    e.preventDefault();
    let errorMessageChangeProfilePicture = "";
    if (this.state.profilePicture == null) {
      errorMessageChangeProfilePicture = "Please upload a profile picture";
    } else {
      // Create an object of formData
      const formData = new FormData();
      formData.append("username", this.state.username);
    
      // Update the formData object
      formData.append(
        "image",
        this.state.profilePicture,
        this.state.profilePicture.name
      );
    
      // Details of the uploaded file
      //console.log(this.state.selectedFile);
    
      // Request made to the backend api
      // Send formData object
      axios.post("http://localhost:8081/api/users/profilepicture", formData);

      //this.props.updateCurrentUser(formData);
    }
    if (errorMessageChangeProfilePicture !== "") {
      this.setState({errorMessageChangeProfilePicture: errorMessageChangeProfilePicture});
    } else {
      this.setState({errorMessageChangeProfilePicture: ""});
    }
  }

  async onSubmitChangePassword(e) {
    e.preventDefault();
    let thisObj = this;
    let errorMessageChangePassword = "";
    if (this.state.newPassword.length < 6) {
      errorMessageChangePassword = "New password must be at least 6 characters";
    } else if (this.state.newPassword !== this.state.confirmPassword) {
      errorMessageChangePassword = "New password and confirm password does not match";
    } else {
      const formData = new FormData();
      formData.append("currentPassword", this.state.currentPassword);
      formData.append("newPassword", this.state.newPassword);
      formData.append("confirmPassword", this.state.confirmPassword);
      
      await axios.post("http://localhost:8081/api/users/changepassword", formData)
        .catch(function (error) {
          if (error.response) {
            setTimeout(() => {
              thisObj.setState({errorMessageChangePassword: error.response.data.message});
            }, 500);
          }
        });
    }
    if (errorMessageChangePassword !== "") {
      this.setState({errorMessageChangePassword: errorMessageChangePassword});
    } else {
      this.setState({errorMessageChangePassword: ""});
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onFileChange = event => {
    this.setState({ profilePicture: event.target.files[0] });
  };

  genderChanged(e) {
    this.setState({ gender: e.target.value })
  }

  render() {
    const { currentUser } = this.props;
    const { errorMessage, errorMessageChangeProfilePicture, errorMessageChangePassword } = this.state;
    return (
      <div className="user-settings">
        <div style={{height: '10vh'}}></div>
        <div className="container">
          <h2>User Settings</h2>
          <div className="row">
            <div className="col-8">
            <div style={{color: 'red'}}>{errorMessage}</div>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" name="username" value={this.state.username} onChange={this.onChange} aria-describedby="usernameHelp" placeholder="Enter your Username (at least 6 characters)" required />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" name="firstName" value={this.state.firstName} onChange={this.onChange} aria-describedby="firstNameHelp" placeholder="Enter Your First Name (at least 2 characters)" required />
                {/* <small id="firstNameHelp" className="form-text text-muted">First name</small> */}
              </div>
              <div className="form-group">
                <label htmlFor="middleName">Middle Name</label>
                <input type="text" className="form-control" id="middleName" name="middleName" value={this.state.middleName} onChange={this.onChange} aria-describedby="middleNameHelp" placeholder="Enter Your Middle Name (at least 2 characters)" />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" id="lastName" name="lastName" value={this.state.lastName} onChange={this.onChange} aria-describedby="lastNameHelp" placeholder="Enter Your Last Name (at least 2 characters)" required />
                {/* <small id="lastNameHelp" className="form-text text-muted">Last name</small> */}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={this.state.email} onChange={this.onChange} aria-describedby="emailHelp" placeholder="Enter your Email" required />
                {/* <small id="emailHelp" className="form-text text-muted">Email.</small> */}
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" value={this.state.phoneNumber} onChange={this.onChange} aria-describedby="phoneNumberHelp" placeholder="Enter your Phone Number" required />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <div style={{height: '10px'}}></div>
                {/* <input type="text" className="form-control" id="gender" name="gender" value={this.state.gender} onChange={this.onChange} aria-describedby="genderHelp" placeholder="Enter your Gender" required /> */}
                <label className="radio-inline"><input type="radio" name="gender" value="M" checked={this.state.gender === 'M'} onChange={(e) => this.genderChanged(e)} />Male</label>
                <label className="radio-inline"><input type="radio" name="gender" value="F" checked={this.state.gender === 'F'} onChange={(e) => this.genderChanged(e)} />Female</label>
                <label className="radio-inline"><input type="radio" name="gender" value="U" checked={this.state.gender === 'U'} onChange={(e) => this.genderChanged(e)} />Unidentified</label>
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
            </div>
            <div className="col-4"></div>
          </div>
        </div>

        <div className="container">
          <h2>Change Profile Picture</h2>
          <div className="row">
            <div className="col-8">
            <div style={{color: 'red'}}>{errorMessageChangeProfilePicture}</div>
            <form onSubmit={this.onSubmitChangeProfilePicture}>
              <div className="form-group">
                <input type="file" className="form-control" id="profilePicture" name="profilePicture" onChange={this.onFileChange} placeholder="Upload a Profile Picture" required />
              </div>
              <button type="submit" className="btn btn-primary">Change Profile Picture</button>
            </form>
            </div>
            <div className="col-4"></div>
          </div>
        </div>

        <div className="container">
          <h2>Change Password</h2>
          <div className="row">
            <div className="col-8">
            <div style={{color: 'red'}}>{errorMessageChangePassword}</div>
            <form onSubmit={this.onSubmitChangePassword}>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input type="password" className="form-control" id="currentPassword" name="currentPassword" value={this.state.currentPassword} onChange={this.onChange} placeholder="Enter your Current Password" required />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input type="password" className="form-control" id="newPassword" name="newPassword" value={this.state.newPassword} onChange={this.onChange} placeholder="Enter your New Password (at least 6 characters)" required />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={this.state.confirmPassword} onChange={this.onChange} placeholder="Confirm your New Password" required />
              </div>
              <button type="submit" className="btn btn-primary">Change Password</button>
            </form>
            </div>
            <div className="col-4"></div>
          </div>
        </div>
        
      </div>
    );
  }
}

Settings.propTypes = {

};

const mapStateToProps = state => ({
  currentUser: state.security.currentUser,
});

export default connect(
  mapStateToProps,
  { updateCurrentUser }
)(Settings);