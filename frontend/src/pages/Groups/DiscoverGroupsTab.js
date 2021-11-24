import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class DiscoverGroupsTab extends Component {
  render() {
    return (
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="all-groups">
            <Link className="nav-link" to="/groups" id="all-groups-tab" data-toggle="tab" role="tab" aria-controls="all-groups" aria-selected="false">
              All Groups
            </Link>
          </li>
          <li className="nav-item" role="discover-groups">
            <Link className="nav-link active" to="/groups/discover" id="discover-groups-tab" data-toggle="tab" role="tab" aria-controls="discover-groups" aria-selected="true">
              Discover Groups
            </Link>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="discover-groups" role="tabpanel" aria-labelledby="discover-groups-tab">
            Discover Groups
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
)(DiscoverGroupsTab);