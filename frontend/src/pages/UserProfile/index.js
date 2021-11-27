import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import SecuredRoute from "../../securityUtils/SecureRoute";
import { getUserProfile } from "../../actions/userProfileActions";
import { getIsConnected } from "../../actions/connectionActions";
import { 
  sendConnectionRequest,
  acceptConnectionRequest,
  deleteConnectionRequest 
} from "../../actions/connectionRequestActions";

import PostsTab from "./PostsTab";
import ProfileTab from "./ProfileTab";
import PublicationsTab from "./PublicationsTab";
import ConnectionsTab from "./ConnectionsTab";
import GroupsTab from "./GroupsTab";

class UserProfile extends Component {
  constructor() {
    super();
    this.connect = this.connect.bind(this);
    this.message = this.message.bind(this);
  }

  componentDidMount() {
    const { match, user } = this.props;
    this.props.getUserProfile(match.params.username);

    if (user.username !== match.params.username) {
      this.props.getIsConnected(match.params.username);
    }
  }

  connect() {
    const { match } = this.props;
    this.props.sendConnectionRequest(match.params.username);
  }

  accept(username, page) {
    this.props.acceptConnectionRequest(username, page);
  }

  delete(username, page) {
    this.props.deleteConnectionRequest(username, page);
  }

  message() {
    
  }

  render() {
    const { match, user, userProfile, isConnected, 
      connectionRequestSent, connectionRequestReceived } = this.props;

    let connectionButton = null;
    if (isConnected) {
      connectionButton = (
        <div style={{float: 'left', margin: '10px'}}>
          <button style={{cursor: 'not-allowed'}}>Connected</button>
        </div>
      );
    } else {
      if (connectionRequestSent) {
        connectionButton = (
          <div style={{float: 'left', margin: '10px'}}>
            <button style={{cursor: 'not-allowed'}}>Connection Request Sent</button>
          </div>
        );
      } else if (connectionRequestReceived) {
        connectionButton = (
          <React.Fragment>
            <div style={{float: 'left', margin: '10px'}}>
              <button onClick={() => this.accept(userProfile.user.username, 'userProfile')}>Accept Connection Request</button>
            </div>
            <div style={{float: 'left', margin: '10px'}}>
              <button onClick={() => this.delete(userProfile.user.username, 'userProfile')}>Reject Connection Request</button>
            </div>
          </React.Fragment>
        );
      } else {
        connectionButton = (
          <div style={{float: 'left', margin: '10px'}}>
            <button onClick={this.connect}>Connect</button>
          </div>
        );
      }
    }

    return (
      <div className="user-profile">
        <div style={{height: '10vh'}}></div>

        <div style={{overflow: 'hidden'}}>
          <img src="" alt="" width="100" height="100" style={{float: 'left'}} />
          { 
            userProfile != null ? (
              <div style={{float: 'left', margin: '10px'}}>
                <h3>{userProfile.user.firstName + ' ' + userProfile.user.lastName}</h3>
                <span>{userProfile.headline}</span>
              </div>
            ) : null
          }
          {
            (user.username === match.params.username) ? (
              <div style={{float: 'left', margin: '10px'}}>
                <button>Update Profile</button>
              </div>
            ) : (
              <React.Fragment>
                {connectionButton}
                <div style={{float: 'left', margin: '10px'}}>
                  <button onClick={this.message}>Message</button>
                </div>
              </React.Fragment>
            )
          }
          
          
        </div>

        <Switch>
          <SecuredRoute exact path={match.path + "/"} component={PostsTab} />
          <SecuredRoute exact path={match.path + "/profile"} component={ProfileTab} />
          <SecuredRoute exact path={match.path + "/publications"} component={PublicationsTab} />
          <SecuredRoute exact path={match.path + "/connections"} component={ConnectionsTab} />
          <SecuredRoute exact path={match.path + "/groups"} component={GroupsTab} />
        </Switch>
   

        {/*  */}

        {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="posts">
            <Link className="nav-link active" to={'/ac/' + user.username} id="posts-tab" data-toggle="tab" role="tab" aria-controls="posts" aria-selected="true">
              Posts
            </Link>
          </li>
          <li className="nav-item" role="profile">
            <Link className="nav-link" to={'/ac/' + user.username + '/profile'} id="profile-tab" data-toggle="tab" role="tab" aria-controls="profile" aria-selected="false">
              Profile
            </Link>
          </li>
          <li className="nav-item" role="publications">
            <Link className="nav-link" to={'/ac/' + user.username + '/publications'} id="publications-tab" data-toggle="tab" role="tab" aria-controls="publications" aria-selected="false">
              Publications
            </Link>
          </li>
          <li className="nav-item" role="connections">
            <Link className="nav-link" to={'/ac/' + user.username + '/connections'} id="connections-tab" data-toggle="tab" role="tab" aria-controls="connections" aria-selected="false">
              Connections
            </Link>
          </li>
          <li className="nav-item" role="groups">
            <Link className="nav-link" to={'/ac/' + user.username + '/groups'} id="groups-tab" data-toggle="tab" role="tab" aria-controls="groups" aria-selected="false">
              Groups
            </Link>
          </li>
        </ul> */}
        {/* <div className="tab-content" id="myTabContent">
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
        </div> */}

        {/*  */}
      </div>
    );
  }
}

UserProfile.propTypes = {

};

const mapStateToProps = state => ({
  user: state.security.user,
  userProfile: state.userProfileReducer.userProfile,
  isConnected: state.connectionReducer.isConnected,
  connectionRequestSent: state.connectionRequestReducer.connectionRequestSent,
  connectionRequestReceived: state.connectionRequestReducer.connectionRequestReceived,
});

export default connect(
  mapStateToProps,
  { getUserProfile, 
    getIsConnected, 
    sendConnectionRequest,
    acceptConnectionRequest,
    deleteConnectionRequest
  }
)(UserProfile);