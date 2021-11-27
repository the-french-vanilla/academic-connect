import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { 
  getAllConnections,
  unconnect,
} from "../../actions/connectionActions";

class AllConnectionsTab extends Component {
  componentDidMount() {
    this.props.getAllConnections();
  }

  unconnect(username) {
    this.props.unconnect(username);
  }

  render() {
    const { connections } = this.props;
    console.log(connections)
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
            
          {
            connections.length > 0 ? (
              connections.map((connection) =>
                <div key={connection.id} className="container border round bg-light">
                  <img src="" alt="Alex Aravind" width="80" height="80" style={{padding: '10px', float: 'left'}} />
                  <div style={{padding: '10px'}}>
                    <span><b>{connection.user2.firstName + ' ' + connection.user2.lastName}</b></span><br />
                    <div className="col-9"></div>
                    <div className="col-3">
                      <button onClick={() => this.unconnect(connection.user2.username)}>Unconnect</button>
                    </div>
                  </div>
                </div>
              ) 
            ) : <div>You do not have any connections. Start connecting with people.</div>
          }

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  connections: state.connectionReducer.connections,
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
  { getAllConnections, unconnect }
)(AllConnectionsTab);