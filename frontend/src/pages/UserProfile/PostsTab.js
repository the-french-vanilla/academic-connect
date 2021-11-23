import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import SecuredRoute from "../../securityUtils/SecureRoute";
import { createNewPost, getAllPosts } from "../../actions/postActions";

class PostsTab extends Component {
  constructor() {
    super();
    this.state = {
      text: ""
    };
    // this.logout = this.logout.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  componentDidMount() {
    this.props.getAllPosts();
  }

  test = (e) => {
    e.preventDefault();
  }

  updateText(e) {
    this.setState({
      text: e.target.value
    });
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

    this.setState({
      text: ""
    });

    // window.location.href = "/";
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    let posts = this.props.posts;
    const { user } = this.props;

    return (
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="posts">
            {/* <a className="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true">Posts</a> */}
            <Link className="nav-link active" to={'/ac/' + user.username} id="posts-tab" data-toggle="tab" role="tab" aria-controls="posts" aria-selected="true">
              Posts
            </Link>
          </li>
          <li className="nav-item" role="profile">
            {/* <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a> */}
            <Link className="nav-link" to={'/ac/' + user.username + '/profile'} id="profile-tab" data-toggle="tab" role="tab" aria-controls="profile" aria-selected="false">
              Profile
            </Link>
          </li>
          <li className="nav-item" role="publications">
            {/* <a className="nav-link" id="publications-tab" data-toggle="tab" href="#publications" role="tab" aria-controls="publications" aria-selected="false">Publications</a> */}
            <Link className="nav-link" to={'/ac/' + user.username + '/publications'} id="publications-tab" data-toggle="tab" role="tab" aria-controls="publications" aria-selected="false">
              Publications
            </Link>
          </li>
          <li className="nav-item" role="connections">
            {/* <a className="nav-link" id="connections-tab" data-toggle="tab" href="#connections" role="tab" aria-controls="connections" aria-selected="false">Connections</a> */}
            <Link className="nav-link" to={'/ac/' + user.username + '/connections'} id="connections-tab" data-toggle="tab" role="tab" aria-controls="connections" aria-selected="false">
              Connections
            </Link>
          </li>
          <li className="nav-item" role="groups">
            {/* <a className="nav-link" id="groups-tab" data-toggle="tab" href="#groups" role="tab" aria-controls="groups" aria-selected="false">Groups</a> */}
            <Link className="nav-link" to={'/ac/' + user.username + '/groups'} id="groups-tab" data-toggle="tab" role="tab" aria-controls="groups" aria-selected="false">
              Groups
            </Link>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
            <div className="container">
              <div className="row">
                <div className="col-8">
                <div className="feed_and_add_section">
                  <div className="create_post common_bg_feed">
                    <div className="create_input d_flex">
                      <div className="profile_thumb rounded-img">
                        <img src="/Users/deeppatel/Desktop/terry.jpeg" alt="" height="20" width="20" />
                      </div>
                      <form onSubmit={this.test}>
                        <input type="text" value={this.state.text} onChange={this.updateText} placeholder="What's New about today?"/>
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
                      <button disabled={this.state.text == "" ? 'disabled' : ''} onClick={this.onSubmit} className="btn btn-outline-success">Publish</button>
                    </div>
                  </div>  
                  </div>
                </div>
                <div className="col-4"></div>
              </div>
            </div>

            {
              posts.map((post) =>
                <div key={post.id} className="container">
                  <div className="row">
                    <div className="col-8">
                      <div  className="card">
                        <div className="create_input d_flex">
                          <div className="profile_thumb rounded-img">
                            <img src="/Users/deeppatel/Desktop/terry.jpeg" alt="" height="20" width="20" />
                          </div>
                          <div style={{float: 'right'}}>
                            <h4>{user.firstName + ' ' + user.lastName}</h4>
                            <h6>{post.createAt}</h6>
                          </div>
                          <div>
                          <p>{post.text}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4"></div>
                  </div>
                </div>
              )
            }

            {/* <div className="container">
              <div className="row">
                <div className="col-8">
                  <div  className="card">
                    <div className="create_input d_flex">
                      <div className="profile_thumb rounded-img">
                        <img src="/Users/deeppatel/Desktop/terry.jpeg" alt="" height="20" width="20" />
                      </div>
                      <div style={{float: 'right'}}>
                        <h4>John Doe</h4>
                        <h6>January 1</h6>
                      </div>
                      <div>
                      <p>Hello world</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4"></div>
              </div>
            </div> */}
                
          </div>
          </div>
          </div>
    );
  }
}

const mapStateToProps = state => ({
  security: state.security,
  posts: state.postReducer.posts,
  numConnections: state.connectionReducer.numConnections,
  numPublications: state.publicationReducer.numPublications,
  numGroups: state.groupReducer.numGroups,
  user: state.security.user,

  firstContactId: state.contactReducer.firstContactId,
  firstOtherContactId: state.contactReducer.firstOtherContactId,
});

export default connect(
  mapStateToProps,
  { createNewPost, getAllPosts }
)(PostsTab);