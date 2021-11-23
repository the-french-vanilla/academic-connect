import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class UserProfile extends Component {
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
    return (
      <div className="user-profile">
        <div style={{height: '10vh'}}></div>

        <div style={{overflow: 'hidden'}}>
          <img src="" alt="" width="100" height="100" style={{float: 'left'}} />
          <div style={{float: 'left', margin: '10px'}}>
            <h3>Terry Jiang</h3>
            <span>Associate Professor at UNBC</span>
          </div>
          <div style={{float: 'left', margin: '10px'}}>
            <button>Connect</button>
          </div>
          <div style={{float: 'left', margin: '10px'}}>
            <button>Message</button>
          </div>
        </div>

        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="posts">
            <a className="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true">Posts</a>
          </li>
          <li className="nav-item" role="profile">
            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
          </li>
          <li className="nav-item" role="publications">
            <a className="nav-link" id="publications-tab" data-toggle="tab" href="#publications" role="tab" aria-controls="publications" aria-selected="false">Publications</a>
          </li>
          <li className="nav-item" role="connections">
            <a className="nav-link" id="connections-tab" data-toggle="tab" href="#connections" role="tab" aria-controls="connections" aria-selected="false">Connections</a>
          </li>
          <li className="nav-item" role="groups">
            <a className="nav-link" id="groups-tab" data-toggle="tab" href="#groups" role="tab" aria-controls="groups" aria-selected="false">Groups</a>
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
          <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            
            <div style={{height: '30px'}}></div>

            <div className="container border round bg-light">
              <h4>Education</h4>
              <span><b>University of Manitoba</b></span>
              <div id="spacing"></div>
              <span>Doctor of Philosophy, Computer Science (2012-2017)</span><br />
              <span>Master's Degree, Computer Science (2010-2012)</span><br />
              <span>Bachelor's Degree, Computer Science (2005-2010)</span>
              <div id="spacing"></div>
            </div>

            <div style={{height: '30px'}}></div>

            <div className="container border round bg-light">
              <span><b>Publications</b></span>
              <span style={{float: 'right'}}>21</span><br />
              <span><b>Citations</b></span>
              <span style={{float: 'right'}}>233</span>
            </div>

            <div style={{height: '30px'}}></div>

            <div className="container border round bg-light">
              <span><b>Co-authors:</b></span><br />
              <span>G. M. Adam Pazdor</span><br />
              <span>Trevor L. Cook</span><br />
              <span>Edson M. Dela Cruz</span><br />
              <span>Patrick M. J. Dubois</span><br />
              <span>Zhao Han</span>
            </div>

          </div>
          <div className="tab-pane fade" id="publications" role="tabpanel" aria-labelledby="publications-tab">
            <div style={{height: '30px'}}></div>
            <div className="container border round bg-light">
              <span style={{float: 'right'}}>2018</span>
              <span><b>Big Data Analytics of Social Network Data: Who Cares Most About You on Facebook?</b></span><br />
              <div id="spacing"></div>
              <span>Carson K. Leung, <b><u>Fan Jiang</u></b>, Tik Wai Poon, Paul-Emile Crevier</span>
            </div>
          </div>
          <div className="tab-pane fade" id="connections" role="tabpanel" aria-labelledby="connections-tab">
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
          <div className="tab-pane fade" id="groups" role="tabpanel" aria-labelledby="groups-tab">
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

UserProfile.propTypes = {

};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(UserProfile);