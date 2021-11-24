import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import SecuredRoute from "../../securityUtils/SecureRoute";
import AllResultsTab from "./AllResultsTab";
import PeopleTab from "./PeopleTab";
import PagesTab from "./PagesTab";
import GroupsTab from "./GroupsTab";
import EventsTab from "./EventsTab";

class SearchResults extends Component {
  render() {
    const {match} = this.props;

    return (
      <div className="search-results">
        <div style={{height: '10vh'}}></div>

        <h1 className="h3 mb-3">Search Results</h1>

        <Switch>
          <SecuredRoute exact path={match.path + "/"} component={AllResultsTab} />
          <SecuredRoute exact path={match.path + "/people"} component={PeopleTab} />
          <SecuredRoute exact path={match.path + "/pages"} component={PagesTab} />
          <SecuredRoute exact path={match.path + "/groups"} component={GroupsTab} />
          <SecuredRoute exact path={match.path + "/events"} component={EventsTab} />
        </Switch>

      </div>
    );
  }
}

SearchResults.propTypes = {

};

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
)(SearchResults);