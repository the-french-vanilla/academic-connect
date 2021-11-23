import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";

class PublicationsTab extends Component {
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
            <Link className="nav-link" to={'/ac/' + user.username + '/profile'} id="profile-tab" data-toggle="tab" role="tab" aria-controls="profile" aria-selected="false">
              Profile
            </Link>
          </li>
          <li className="nav-item" role="publications">
            <Link className="nav-link active" to={'/ac/' + user.username + '/publications'} id="publications-tab" data-toggle="tab" role="tab" aria-controls="publications" aria-selected="true">
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
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="publications" role="tabpanel" aria-labelledby="publications-tab">
            <div style={{height: '30px'}}></div>
            <div className="container border round bg-light">
              <span style={{float: 'right'}}>2018</span>
              <span><b>Big Data Analytics of Social Network Data: Who Cares Most About You on Facebook?</b></span><br />
              <div id="spacing"></div>
              <span>Carson K. Leung, <b><u>Fan Jiang</u></b>, Tik Wai Poon, Paul-Emile Crevier</span>
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
)(PublicationsTab);