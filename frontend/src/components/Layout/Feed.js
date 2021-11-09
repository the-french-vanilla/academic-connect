import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";
import { createNewPost, getAllPosts } from "../../actions/postActions";
import PropTypes from "prop-types";

class Feed extends Component {
  constructor() {
    super();
    this.state = {
      text: ""
    }
    this.logout = this.logout.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/feed");
    }

    this.props.getAllPosts();
  }

  logout() {
    this.props.logout();
    window.location.href = "/";
  }

  onSubmit(e) {
    e.preventDefault();
    const PostRequest = {
      postId: 1,
      text: this.state.text,
      reaction: 'test',
      deleted: false
    };

    this.props.createNewPost(PostRequest);

    window.location.href = "/";
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    let posts = this.props.posts;

    return (
      <div className="feed">
        <h1>Feed Page</h1>

        <Link to="/settings">User Settings </Link><br />
        <Link to="/ac/johndoe">User Profile </Link><br />
        <Link to="/groups/testgroup">Group Profile </Link><br />
        <Link to="/messaging/thread/1">Messaging</Link><br />

        <Link
          className="nav-link"
          to="/logout"
          onClick={this.logout}
        >
          Logout
        </Link><br />

        <form onSubmit={this.onSubmit} method="post">
          <textarea name="text" value={this.state.post} onChange={this.onChange} />
          <button type="submit">Post</button>
        </form>

        {
          posts.map((post) =>
            <div key={post.id}>
              {post.id} {post.text}
            </div>
          )
        }
      </div>
    );
  }
}

Feed.propTypes = {
  logout: PropTypes.func.isRequired,
  getAllPosts: PropTypes.func.isRequired,
  createNewPost: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  posts: state.postReducer.posts,
});

export default connect(
  mapStateToProps,
  { logout, createNewPost, getAllPosts }
)(Feed);