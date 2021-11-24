import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class AllConnectionsTab extends Component {
  render() {
    return (
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="all-connections">
            <Link className="nav-link active" to="/connections" id="all-connections-tab" data-toggle="tab" role="tab" aria-controls="all-connections" aria-selected="true">
              All Connections
            </Link>
          </li>
          <li className="nav-item" role="connection-requests">
            <Link className="nav-link" to="/connections/requests" id="connection-requests-tab" data-toggle="tab" role="tab" aria-controls="connection-requests" aria-selected="false">
              Connection Requests
            </Link>
          </li>
          <li className="nav-item" role="suggestions">
            <Link className="nav-link" to="/connections/suggestions" id="suggestions-tab" data-toggle="tab" role="tab" aria-controls="suggestions" aria-selected="false">
              Suggestions
            </Link>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="all-connections" role="tabpanel" aria-labelledby="all-connections-tab">
            All Connections
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
)(AllConnectionsTab);