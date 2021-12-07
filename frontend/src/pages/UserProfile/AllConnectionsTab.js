import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Routes, Switch, Link } from "react-router-dom";
import SecuredRoute from "../../securityUtils/SecureRoute";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";
import { getAllConnections, getNumberOfConnections, getNumberOfMutualConnections } from "../../actions/connectionActions";

import ConnectionTile from "../../components/Layout/ConnectionTile";

class AllConnectionsTab extends Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.getAllConnections(match.params.username);
    this.props.getNumberOfConnections(match.params.username);
    this.props.getNumberOfMutualConnections(match.params.username);
  }

  render() {
    const { match, user, connections, numConnections, numMutualConnections } = this.props;

    // console.log(connections)
    // console.log(numConnections)

    return (
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="posts">
            <Link className="nav-link" to={'/ac/' + match.params.username} id="posts-tab" data-toggle="tab" role="tab" aria-controls="posts" aria-selected="false">
              Posts
            </Link>
          </li>
          <li className="nav-item" role="profile">
            <Link className="nav-link" to={'/ac/' + match.params.username + '/profile'} id="profile-tab" data-toggle="tab" role="tab" aria-controls="profile" aria-selected="false">
              Profile
            </Link>
          </li>
          {/* <li className="nav-item" role="publications">
            <Link className="nav-link" to={'/ac/' + match.params.username + '/publications'} id="publications-tab" data-toggle="tab" role="tab" aria-controls="publications" aria-selected="false">
              Publications
            </Link>
          </li> */}
          <li className="nav-item" role="connections">
            <Link className="nav-link active" to={'/ac/' + match.params.username + '/connections'} id="connections-tab" data-toggle="tab" role="tab" aria-controls="connections" aria-selected="true">
              Connections
            </Link>
          </li>
          {/* <li className="nav-item" role="groups">
            <Link className="nav-link" to={'/ac/' + match.params.username + '/groups'} id="groups-tab" data-toggle="tab" role="tab" aria-controls="groups" aria-selected="false">
              Groups
            </Link>
          </li> */}
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="connections" role="tabpanel" aria-labelledby="connections-tab">
            <div style={{height: '30px'}}></div>

            <div className="container">

              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="all-connections">
                  <Link className="nav-link active" to={'/ac/' + match.params.username + '/connections'} id="all-connections-tab" data-toggle="tab" role="tab" aria-controls="all-connections" aria-selected="true">
                    All Connections ({numConnections})
                  </Link>
                </li>
                { 
                  (user.username !== match.params.username) ? (
                    <li className="nav-item" role="mutual-connections">
                      <Link className="nav-link" to={'/ac/' + match.params.username + '/connections/mutual'} id="mutual-connections-tab" data-toggle="tab" role="tab" aria-controls="mutual-connections" aria-selected="false">
                        Mutual Connections ({numMutualConnections})
                      </Link>
                    </li>
                  ) : null
                }
              </ul>

              <div style={{height: '30px'}}></div>

              <div className="row">
              <div className="col">
              {
                connections.map((connection) => 
                  <ConnectionTile key={connection.id} connection={connection} />
                )
              }
              </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // security: state.security,
  // posts: state.postReducer.posts,
  connections: state.connectionReducer.connections,
  numConnections: state.connectionReducer.numConnections,
  numMutualConnections: state.connectionReducer.numMutualConnections,
  // numPublications: state.publicationReducer.numPublications,
  // numGroups: state.groupReducer.numGroups,
  user: state.security.user,

  // firstContactId: state.contactReducer.firstContactId,
  // firstOtherContactId: state.contactReducer.firstOtherContactId,
});

export default connect(
  mapStateToProps,
  { getAllConnections, getNumberOfConnections, getNumberOfMutualConnections }
)(AllConnectionsTab);