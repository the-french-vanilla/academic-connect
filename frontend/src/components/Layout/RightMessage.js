import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import { getProfilePicture } from "../../actions/securityActions";

class RightMessage extends Component {
  constructor() {
    super();
    this.state = {
      profilePictureBinary: null
    }
  }

  async componentDidMount() {
    const { chatMessage } = this.props;
    const res = await axios.get("http://localhost:8081/api/users/profilepicture/" + chatMessage.user1.username);

    this.setState({ profilePictureBinary: res.data });
    //this.props.getProfilePicture(this.props.user.username);
  }

  render() {
    const { chatMessage } = this.props;
    return (
      <div className="chat-message-right mb-4">
        <div>
          <img alt="" src={'data:image/gif;base64,' + this.state.profilePictureBinary} className="rounded-circle mr-1"  width="40" height="40" />
          <div className="text-muted small text-nowrap mt-2">{chatMessage.createAt}</div>
        </div>
        <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
          <div className="font-weight-bold mb-1">You</div>
          {chatMessage.text}
        </div>
      </div>
    );

  }
}

RightMessage.propTypes = {
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
)(RightMessage);