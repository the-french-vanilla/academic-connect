import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchUserProfiles } from "../../actions/userProfileActions";

import UserTile from "../../components/Layout/UserTile";

class PeopleTab extends Component {
  componentDidMount() {
    let params = (new URL(document.location)).searchParams;
    let q = params.get("q");
    this.props.searchUserProfiles(q);
  }

  render() {
    const { userProfiles } = this.props;
    let params = (new URL(document.location)).searchParams;
    let q = params.get("q");
    return (
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="all-results">
            <Link className="nav-link" to={'/search/results/?q=' + q} id="all-results-tab" data-toggle="tab" role="tab" aria-controls="all-results" aria-selected="false">
              All Results
            </Link>
          </li>
          <li className="nav-item" role="people">
            <Link className="nav-link active" to={'/search/results/people/?q=' + q} id="people-tab" data-toggle="tab" role="tab" aria-controls="people" aria-selected="true">
              People
            </Link>
          </li>
          {/* <li className="nav-item" role="pages">
            <Link className="nav-link" to="/search/results/pages" id="pages-tab" data-toggle="tab" role="tab" aria-controls="pages" aria-selected="false">
              Pages
            </Link>
          </li> */}
          {/* <li className="nav-item" role="groups">
            <Link className="nav-link" to="/search/results/groups" id="groups-tab" data-toggle="tab" role="tab" aria-controls="groups" aria-selected="false">
              Groups
            </Link>
          </li> */}
          {/* <li className="nav-item" role="events">
            <Link className="nav-link" to="/search/results/events" id="events-tab" data-toggle="tab" role="tab" aria-controls="events" aria-selected="false">
              Events
            </Link>
          </li> */}
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="people" role="tabpanel" aria-labelledby="people-tab">
            
            <div style={{height: '30px'}}></div>
            <div className="container">
              <h3>Search results for "{q}"</h3>
              <div style={{height: '30px'}}></div>
              
                {
                  userProfiles.map((userProfile) => 
                    <UserTile key={userProfile.id} userProfile={userProfile} />
                  )
                }
              
              <div style={{height: '30px'}}></div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userProfiles: state.userProfileReducer.userProfiles,
  // security: state.security,
  // posts: state.postReducer.posts,
  // numConnections: state.connectionReducer.numConnections,
  // numPublications: state.publicationReducer.numPublications,
  // numGroups: state.groupReducer.numGroups,
  // user: state.security.user,

  // firstContactId: state.contactReducer.firstContactId,
  // firstOtherContactId: state.contactReducer.firstOtherContactId,
});

export default connect(
  mapStateToProps,
  { searchUserProfiles }
)(PeopleTab);