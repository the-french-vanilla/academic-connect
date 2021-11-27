import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class GroupProfile extends Component {
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

    //this.props.createNewPost(PostRequest);

    this.setState({
      text: ""
    });

    // window.location.href = "/";
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="group-profile">
        <div style={{height: '10vh'}}></div>

        <div style={{overflow: 'hidden'}}>
          <img src="" alt="" width="100" height="100" style={{float: 'left'}} />
          <div style={{float: 'left', margin: '10px'}}>
            <h3>Test Group</h3>
          </div>
          <div style={{float: 'left', margin: '10px'}}>
            <button>Join</button>
          </div>
        </div>

        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="posts">
            <a className="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true">Posts</a>
          </li>
          <li className="nav-item" role="description">
            <a className="nav-link" id="description-tab" data-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="false">Description</a>
          </li>
          <li className="nav-item" role="members">
            <a className="nav-link" id="members-tab" data-toggle="tab" href="#members" role="tab" aria-controls="members" aria-selected="false">Members</a>
          </li>
          {/* <li className="nav-item" role="connections">
            <a className="nav-link" id="connections-tab" data-toggle="tab" href="#connections" role="tab" aria-controls="connections" aria-selected="false">Events</a>
          </li> */}
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

            <div className="container">
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
            </div>
                
          </div>
          <div className="tab-pane fade" id="description" role="tabpanel" aria-labelledby="description-tab">
            
            <div style={{height: '30px'}}></div>

            <div className="container border round bg-light">
              <h4>Description</h4>
              <div id="spacing"></div>
              <span>Test group.</span><br />
              <div id="spacing"></div>
            </div>


          </div>
          <div className="tab-pane fade" id="members" role="tabpanel" aria-labelledby="members-tab">
            <div style={{height: '30px'}}></div>

            <div className="container">
              <div className="row">
                <div className="col-6">
                  <div className="container border round bg-light">
                    <img src="" alt="Alex Aravind" width="80" height="80" style={{padding: '10px', float: 'left'}} />
                    <div style={{padding: '10px'}}>
                      <span><b>Alex Aravind</b></span><br />
                      <div id="spacing"></div>
                      <span>Post-Doctoral Fellow</span><br />
                      <div id="spacing"></div>
                      <span>4 Mutual Connections</span>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="container border round bg-light">
                    <img src="" alt="Alex Aravind" width="80" height="80" style={{padding: '10px', float: 'left'}} />
                    <div style={{padding: '10px'}}>
                      <span><b>Alex Aravind</b></span><br />
                      <div id="spacing"></div>
                      <span>Post-Doctoral Fellow</span><br />
                      <div id="spacing"></div>
                      <span>4 Mutual Connections</span>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{height: '30px'}}></div>
              <div className="row">
                <div className="col-6">
                  <div className="container border round bg-light">
                    <img src="" alt="Alex Aravind" width="80" height="80" style={{padding: '10px', float: 'left'}} />
                    <div style={{padding: '10px'}}>
                      <span><b>Alex Aravind</b></span><br />
                      <div id="spacing"></div>
                      <span>Post-Doctoral Fellow</span><br />
                      <div id="spacing"></div>
                      <span>4 Mutual Connections</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    );
  }
}

GroupProfile.propTypes = {

};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(GroupProfile);