import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";
import { createNewPost, getAllPosts } from "../../actions/postActions";
import PropTypes from "prop-types";

import "./feed.css";

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

       

    <section className="part1">
        <div className="profile">
          <img src="/Users/deeppatel/Desktop/terry.jpeg" alt="" height="125px" width="145px" />
        </div>
        <h4>Terry Jiang</h4>

        
        <h5>
          <Link to="/ac/johndoe/connections">143 Connections</Link><br />
          <Link to="/ac/johndoe/publications">43 Publications</Link><br />
          <Link to="/ac/johndoe/groups">5 Groups</Link>
        </h5>
        <hr className="dashed" />
        <h3 className="centre"><u>Trending News</u></h3>
      </section>
      

        {/* <section className="post">
            
          </section> */}

          <section>
            <div className="part2">
            <div className="row">
              <div className="leftcolumn">
                <div className="feed_and_add_section">
                  <div className="create_post common_bg_feed">
                    <div className="create_input d_flex">
                      <div className="profile_thumb rounded-img">
                        <img src="/Users/deeppatel/Desktop/terry.jpeg" alt="" height="20" width="20" />
                      </div>
                      <form action="">
                        <input type="text" placeholder="What's New about today?"/>
                      </form>
                    </div>
                    <div className="create_btn">
                      <ul className="d_flex">
                        <li className="d_flex_centre">
                          <span><a href="#">
                            <i className="fa fa-pencil-square-o"></i></a></span>
                          <h6>What'sUp</h6>
                        </li>
                        <li className="d_flex_centre">
                          <span><a href="#"><i className="fa fa-file-image-o"></i></a></span>
                          <h6>Photo/Video</h6>
                        </li>
                        <li className="d_flex_centre">
                          <span><a href="#"><i className="fa fa-video-camera"></i></a></span>
                          <h6>Live Video</h6>
                        </li>
                      </ul>
                      <button className="btn btn-outline-success">Publish</button>
                    </div>
                  </div>
                </div>


                <div className="card">
                  <h2>Allan Kranz</h2>
                  <h6>Title description, Dec 7, 2017</h6>
                  <div className="fakeimg" style={{height:'200px'}}>Image</div>
                  <p>Some text..</p>
                  <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco.</p>
                </div>
                <div className="card">
                  <h2>Waqar Haque</h2>
                  <h6>Title description, Sep 2, 2017</h6>
                  <div className="fakeimg" style={{height:'200px'}}>Image</div>
                  <p>Some text..</p>
                  <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco.</p>
                </div>
              </div>
            </div>
            </div>
          </section>

          {/* <script src="js/script.js"></script> */}



        {/* <h1>Feed Page</h1>

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
        } */}
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