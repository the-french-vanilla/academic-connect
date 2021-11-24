import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class AllEventsTab extends Component {
  render() {
    return (
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="all-events">
            <Link className="nav-link active" to="/events" id="all-events-tab" data-toggle="tab" role="tab" aria-controls="all-events" aria-selected="true">
              All Events
            </Link>
          </li>
          <li className="nav-item" role="discover-events">
            <Link className="nav-link" to="/events/discover" id="discover-events-tab" data-toggle="tab" role="tab" aria-controls="discover-events" aria-selected="false">
              Discover Events
            </Link>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="all-events" role="tabpanel" aria-labelledby="all-events-tab">
            All Events
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
)(AllEventsTab);