import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import { deletePost } from "../../actions/postActions";
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

  delete(postId) {
    this.props.deletePost(postId, this.props.page, this.props.user.username);
  }

  render() {
    const { post, user } = this.props;
    return (
      <div className="card">
        <div className="create_input d_flex">

          <div className="profile_thumb rounded-img">
            <img alt="" height="20" width="20" src={'data:image/gif;base64,' + this.state.profilePictureBinary} />
          </div>
          
          <div style={{margin: '10px', width: '100%'}}>
            {
              (user.username === post.user.username) ?
                <div onClick={() => this.delete(post.id)} style={{float: 'right', cursor: 'pointer'}} aria-hidden="true">&times;</div> :
                null
            }

            <Link to={'/ac/' + post.user.username}>
              <span>{post.user.firstName + ' ' + post.user.lastName}</span>
            </Link> <span style={{marginLeft: '10px'}}>{post.createAt}</span>
            
            <div>{post.text}</div>
          </div>
          
          <div>
          
            

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
  user: state.security.user,
  // security: state.security,
  // firstContactId: state.contactReducer.firstContactId,
});

export default connect(
  mapStateToProps,
  { getProfilePicture, deletePost }
)(Post);