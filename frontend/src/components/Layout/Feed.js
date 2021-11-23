import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";
import { createNewPost, getAllPosts } from "../../actions/postActions";
import { getNumberOfConnections } from "../../actions/connectionActions";
import { getNumberOfPublications } from "../../actions/publicationActions";
import { getNumberOfGroups } from "../../actions/groupActions";
import { getFirstContactId, getFirstOtherContactId } from "../../actions/contactActions";
import PropTypes from "prop-types";

class Feed extends Component {
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
    if (this.props.security.validToken) {
      this.props.history.push("/feed");
    }

    this.props.getAllPosts();
    this.props.getNumberOfConnections();
    this.props.getNumberOfPublications();
    //this.props.getNumberOfGroups();
    this.props.getFirstContactId();
    this.props.getFirstOtherContactId();
  }

  test = (e) => {
    e.preventDefault();
  }

  updateText(e) {
    this.setState({
      text: e.target.value
    });
  }

  // logout() {
  //   this.props.logout();
  //   window.location.href = "/";
  // }

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

    const { numConnections, numPublications, numGroups }  = this.props;
    const { user } = this.props;

    const { firstContactId, firstOtherContactId } = this.props;

    return (
      <div className="feed">

       

    <section className="part1">
        <div className="profile">
          <img src="/Users/deeppatel/Desktop/terry.jpeg" alt="" height="125px" width="145px" />
        </div>
        <h4>{user.firstName + ' ' + user.lastName}</h4>
        
        <h5>
          <Link to={'/ac/' + user.username + '/connections'}>{numConnections} Connection{numConnections > 1 ? 's': ''}</Link><br />
          <Link to={'/ac/' + user.username + '/publications'}>{numPublications} Publication{numPublications > 1 ? 's': ''}</Link><br />
          <Link to={'/ac/' + user.username + '/groups'}>{numGroups} Group{numGroups > 1 ? 's': ''}</Link>
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

                {
                  posts.map((post) =>
                    <div key={post.id} className="card">
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
                  )
                }
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
  numConnections: state.connectionReducer.numConnections,
  numPublications: state.publicationReducer.numPublications,
  numGroups: state.groupReducer.numGroups,
  user: state.security.user,

  firstContactId: state.contactReducer.firstContactId,
  firstOtherContactId: state.contactReducer.firstOtherContactId,
});

export default connect(
  mapStateToProps,
  { logout, createNewPost, getAllPosts,
    getNumberOfConnections, getNumberOfPublications, getNumberOfGroups,
    getFirstContactId, getFirstOtherContactId }
)(Feed);