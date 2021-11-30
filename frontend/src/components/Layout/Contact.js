import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import { getProfilePicture } from "../../actions/securityActions";

class Contact extends Component {
  constructor() {
    super();
    this.state = {
      profilePictureBinary: null
    }
  }

  async componentDidMount() {
    const { contact } = this.props;
    const res = await axios.get("http://localhost:8081/api/users/profilepicture/" + contact.user2.username);

    this.setState({ profilePictureBinary: res.data });
    //this.props.getProfilePicture(this.props.user.username);
  }

  render() {
    const { contact } = this.props;
    return (
      <React.Fragment>
        {/* <div className="badge bg-success float-right">5</div> */}
        <div className="d-flex align-items-start">
          <img alt="" src={'data:image/gif;base64,' + this.state.profilePictureBinary} className="rounded-circle mr-1"  width="40" height="40" />
          <div className="flex-grow-1 ml-3">
            {contact.user2.firstName + ' ' + contact.user2.lastName}
            {/* <div className="small"><span className="fas fa-circle chat-online"></span> Online</div> */}
          </div>
        </div>
      </React.Fragment>
    );

  }
}

Contact.propTypes = {
  // logout: PropTypes.func.isRequired,
  // security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // security: state.security,
  // firstContactId: state.contactReducer.firstContactId,
});

export default connect(
  mapStateToProps,
  { getProfilePicture }
)(Contact);