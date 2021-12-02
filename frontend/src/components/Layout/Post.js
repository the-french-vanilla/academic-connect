import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import { getProfilePicture } from "../../actions/securityActions";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      profilePictureBinary: null
    }
  }

  async componentDidMount() {
    const { post } = this.props;
    const res = await axios.get("http://localhost:8081/api/users/profilepicture/" + post.user.username);

    this.setState({ profilePictureBinary: res.data });
    //this.props.getProfilePicture(this.props.user.username);
  }

  render() {
    const { post } = this.props;
    return (
      <div className="card">
        <div className="create_input d_flex">
          <div className="profile_thumb rounded-img">
            <img alt="" height="20" width="20" src={'data:image/gif;base64,' + this.state.profilePictureBinary} />
          </div>
          <div style={{float: 'right'}}>
            <Link className="nav-link" to={'/ac/' + post.user.username}>
              <h6>{post.user.firstName + ' ' + post.user.lastName}</h6>
            </Link>
            <h6>{post.createAt}</h6>
          </div>
          <div>
            <p>{post.text}</p>
          </div>
        </div>
      </div>
    );

  }
}

Post.propTypes = {
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
)(Post);