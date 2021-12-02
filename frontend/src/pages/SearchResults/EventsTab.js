import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class EventsTab extends Component {
  render() {
    return (
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="all-results">
            <Link className="nav-link" to="/search/results" id="all-results-tab" data-toggle="tab" role="tab" aria-controls="all-results" aria-selected="false">
              All Results
            </Link>
          </li>
          <li className="nav-item" role="people">
            <Link className="nav-link" to="/search/results/people" id="people-tab" data-toggle="tab" role="tab" aria-controls="people" aria-selected="false">
              People
            </Link>
          </li>
          {/* <li className="nav-item" role="pages">
            <Link className="nav-link" to="/search/results/pages" id="pages-tab" data-toggle="tab" role="tab" aria-controls="pages" aria-selected="false">
              Pages
            </Link>
          </li> */}
          <li className="nav-item" role="groups">
            <Link className="nav-link" to="/search/results/groups" id="groups-tab" data-toggle="tab" role="tab" aria-controls="groups" aria-selected="false">
              Groups
            </Link>
          </li>
          {/* <li className="nav-item" role="events">
            <Link className="nav-link active" to="/search/results/events" id="events-tab" data-toggle="tab" role="tab" aria-controls="events" aria-selected="true">
              Events
            </Link>
          </li> */}
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="events" role="tabpanel" aria-labelledby="events-tab">
            Events
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
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
  mapStateToProps
)(EventsTab);