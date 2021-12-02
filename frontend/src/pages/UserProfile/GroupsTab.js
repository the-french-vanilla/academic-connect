import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";

class GroupsTab extends Component {
  render() {
    const { match, user } = this.props;
    return (
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="posts">
            <Link className="nav-link" to={'/ac/' + match.params.username} id="posts-tab" data-toggle="tab" role="tab" aria-controls="posts" aria-selected="false">
              Posts
            </Link>
          </li>
          <li className="nav-item" role="profile">
            <Link className="nav-link" to={'/ac/' + match.params.username + '/profile'} id="profile-tab" data-toggle="tab" role="tab" aria-controls="profile" aria-selected="false">
              Profile
            </Link>
          </li>
          {/* <li className="nav-item" role="publications">
            <Link className="nav-link" to={'/ac/' + match.params.username + '/publications'} id="publications-tab" data-toggle="tab" role="tab" aria-controls="publications" aria-selected="false">
              Publications
            </Link>
          </li> */}
          <li className="nav-item" role="connections">
            <Link className="nav-link" to={'/ac/' + match.params.username + '/connections'} id="connections-tab" data-toggle="tab" role="tab" aria-controls="connections" aria-selected="false">
              Connections
            </Link>
          </li>
          <li className="nav-item" role="groups">
            <Link className="nav-link active" to={'/ac/' + match.params.username + '/groups'} id="groups-tab" data-toggle="tab" role="tab" aria-controls="groups" aria-selected="true">
              Groups
            </Link>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="groups" role="tabpanel" aria-labelledby="groups-tab">
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
  mapStateToProps
)(GroupsTab);