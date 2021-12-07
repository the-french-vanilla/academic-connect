import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { 
  getSentConnectionRequests, 
  getReceivedConnectionRequests,
  acceptConnectionRequest,
  deleteConnectionRequest,
  cancelConnectionRequest 
} from "../../actions/connectionRequestActions";
import ReceivedConnectionRequestTile from "../../components/Layout/ReceivedConnectionRequestTile";
import SentConnectionRequestTile from "../../components/Layout/SentConnectionRequestTile";

class ConnectionRequestsTab extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getSentConnectionRequests();
    this.props.getReceivedConnectionRequests();
  }

  // accept(username, page) {
  //   this.props.acceptConnectionRequest(username, page);
  // }

  // delete(username, page) {
  //   this.props.deleteConnectionRequest(username, page);
  // }

  cancel(username) {
    this.props.cancelConnectionRequest(username);
  }

  render() {
    const { sentConnectionRequests, receivedConnectionRequests } = this.props;

    console.log(sentConnectionRequests)

    return (
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="all-connections">
            <Link className="nav-link" to="/connections" id="all-connections-tab" data-toggle="tab" role="tab" aria-controls="all-connections" aria-selected="false">
              All Connections
            </Link>
          </li>
          <li className="nav-item" role="connection-requests">
            <Link className="nav-link active" to="/connections/requests" id="connection-requests-tab" data-toggle="tab" role="tab" aria-controls="connection-requests" aria-selected="true">
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
          <div className="tab-pane fade show active" id="connection-requests" role="tabpanel" aria-labelledby="connection-requests-tab">
            
            <div style={{height: '30px'}}></div>

            <div className="container">

            <h3>Received Connection Requests</h3>

            <div className="row">
              <div className="col">
            {
              receivedConnectionRequests.length > 0 ? (
                receivedConnectionRequests.map((receivedConnectionRequest) =>
                  <ReceivedConnectionRequestTile key={receivedConnectionRequest.id} receivedConnectionRequest={receivedConnectionRequest} />
                
                ) 
              ) : <div>You have not received any connection requests.</div>
            }
              </div>
            </div>

            </div>

            <div style={{height: '30px'}}></div>

            <div className="container">


            <h3>Sent Connection Requests</h3>

            <div className="row">
              <div className="col">
            {
              sentConnectionRequests.length > 0 ? (
                sentConnectionRequests.map((sentConnectionRequest) =>
                  <SentConnectionRequestTile key={sentConnectionRequest.id} sentConnectionRequest={sentConnectionRequest} />
                
                ) 
              ) : <div>You have not send any connection requests.</div>
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
  sentConnectionRequests: state.connectionRequestReducer.sentConnectionRequests,
  receivedConnectionRequests: state.connectionRequestReducer.receivedConnectionRequests,
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
  { 
    getSentConnectionRequests, 
    getReceivedConnectionRequests,
    acceptConnectionRequest,
    deleteConnectionRequest,
    cancelConnectionRequest
 }
)(ConnectionRequestsTab);