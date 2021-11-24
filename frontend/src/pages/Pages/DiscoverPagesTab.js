import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class DiscoverPagesTab extends Component {
  render() {
    return (
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="all-pages">
            <Link className="nav-link" to="/pages" id="all-pages-tab" data-toggle="tab" role="tab" aria-controls="all-pages" aria-selected="false">
              All Pages
            </Link>
          </li>
          <li className="nav-item" role="discover-pages">
            <Link className="nav-link active" to="/pages/discover" id="discover-pages-tab" data-toggle="tab" role="tab" aria-controls="discover-pages" aria-selected="true">
              Discover Pages
            </Link>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="discover-pages" role="tabpanel" aria-labelledby="discover-pages-tab">
            Discover Pages
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
)(DiscoverPagesTab);