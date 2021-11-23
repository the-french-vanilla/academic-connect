import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";

class ProfileTab extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="posts">
            <Link className="nav-link" to={'/ac/' + user.username} id="posts-tab" data-toggle="tab" role="tab" aria-controls="posts" aria-selected="false">
              Posts
            </Link>
          </li>
          <li className="nav-item" role="profile">
            <Link className="nav-link active" to={'/ac/' + user.username + '/profile'} id="profile-tab" data-toggle="tab" role="tab" aria-controls="profile" aria-selected="true">
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
        </ul>
        <div className="tab-content" id="myTabContent"></div>
          <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            
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
)(ProfileTab);