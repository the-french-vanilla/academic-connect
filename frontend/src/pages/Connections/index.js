import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import SecuredRoute from "../../securityUtils/SecureRoute";
import AllConnectionsTab from "./AllConnectionsTab";
import ConnectionRequestsTab from "./ConnectionRequestsTab";
import SuggestionsTab from "./SuggestionsTab";

class Connections extends Component {
  render() {
    const {match} = this.props;

    return (
      <div className="connections">
        <div style={{height: '10vh'}}></div>

       

        <Switch>
          <SecuredRoute exact path={match.path + "/"} component={AllConnectionsTab} />
          <SecuredRoute exact path={match.path + "/requests"} component={ConnectionRequestsTab} />
          <SecuredRoute exact path={match.path + "/suggestions"} component={SuggestionsTab} />
        </Switch>

      </div>
    );
  }
}

Connections.propTypes = {

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
)(Connections);