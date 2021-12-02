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
    const { sendConnectionRequests, receivedConnectionRequests } = this.props;
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

            <h4>Received Connection Requests</h4>

            {
              receivedConnectionRequests.length > 0 ? (
                receivedConnectionRequests.map((receivedConnectionRequest) =>
                  <ReceivedConnectionRequestTile key={receivedConnectionRequest.id} receivedConnectionRequest={receivedConnectionRequest} />
                
                ) 
              ) : <div>You have not send any connection requests.</div>
            }

            </div>

            <div className="container">


            <h4>Sent Connection Requests</h4>

            {
              sendConnectionRequests.length > 0 ? (
                sendConnectionRequests.map((sendConnectionRequest) =>
                  <div key={sendConnectionRequest.id} className="container border round bg-light">
                    <img src="" alt="" width="80" height="80" style={{padding: '10px', float: 'left'}} />
                    <div style={{padding: '10px'}}>
                      <span><b>{sendConnectionRequest.user2.firstName + ' ' + sendConnectionRequest.user2.lastName}</b></span><br />
                      {/* <div id="spacing"></div>
                      <span>Post-Doctoral Fellow</span><br />
                      <div id="spacing"></div>
                      <span>4 Mutual Connections</span> */}
                      <div className="col-9"></div>
                      <div className="col-3">
                        <button onClick={() => this.cancel(sendConnectionRequest.user2.username)}>Cancel</button>
                      </div>
                    </div>
                  </div>
                ) 
              ) : <div>You have not send any connection requests.</div>
            }

            </div>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sendConnectionRequests: state.connectionRequestReducer.sendConnectionRequests,
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