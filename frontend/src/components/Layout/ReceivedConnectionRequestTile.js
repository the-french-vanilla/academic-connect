import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import { getIsConnected } from "../../actions/connectionActions";
import { 
  sendConnectionRequest,
  acceptConnectionRequest,
  deleteConnectionRequest 
} from "../../actions/connectionRequestActions";
import { createContactIfNotExist } from "../../actions/contactActions";

class ReceivedConnectionRequestTile extends Component {
  constructor() {
    super();
    this.state = {
      profilePictureBinary: null
    };

    // this.connect = this.connect.bind(this);
    // this.message = this.message.bind(this);
  }

  async componentDidMount() {
    const { receivedConnectionRequest } = this.props;
    const res = await axios.get("http://localhost:8081/api/users/profilepicture/" + receivedConnectionRequest.user1.username);
    this.setState({ profilePictureBinary: res.data });
  }

  accept(username2, username, page, q) {
    this.props.acceptConnectionRequest(username2, username, page, q);
  }

  delete(username2, username, page, q) {
    this.props.deleteConnectionRequest(username2, username, page, q);
  }

  message(username) {
    this.props.createContactIfNotExist(username, this.props.history);
  }

  render() {
    const { match, receivedConnectionRequest, user } = this.props;
    // console.log(connection)

    let params = (new URL(document.location)).searchParams;
    let q = params.get("q");

    let messageButton = (
      <div style={{float: 'right', margin: '10px'}}>
        <button onClick={() => this.message(receivedConnectionRequest.user1.username)}>Message</button>
      </div>
    );
    // let connectButton = (
    //   <button style={{width: '100px', margin: '10px', float: 'right'}} onClick={() => this.connect(connection.user2.username)}>Connect</button>
    // );


    let connectionButton = null;
    connectionButton = (
      <React.Fragment>
        <div style={{float: 'right', margin: '10px'}}>
          <button onClick={() => this.delete(receivedConnectionRequest.user1.username, receivedConnectionRequest.user2.username, 'connectionRequest')}>Reject Connection Request</button>
        </div>
        <div style={{float: 'right', margin: '10px'}}>
          <button onClick={() => this.accept(receivedConnectionRequest.user1.username, receivedConnectionRequest.user2.username, 'connectionRequest')}>Accept Connection Request</button>
        </div>
      </React.Fragment>
    );
    

    return (
      
      <React.Fragment>
        <div className="container border round bg-light" style={{minHeight: '100px'}}>
          
          {
            messageButton 
          }
          {connectionButton}


          <img alt="" height="80" width="80" style={{padding: '10px', float: 'left'}} src={'data:image/gif;base64,' + this.state.profilePictureBinary} />
          <div style={{padding: '10px'}}>
            <Link className="nav-link" to={'/ac/' + receivedConnectionRequest.user1.username}>
              <span><b>{receivedConnectionRequest.user1.firstName + " " + receivedConnectionRequest.user1.lastName}</b></span>
            </Link>
            <div>{receivedConnectionRequest.headline}</div>
            {
              (receivedConnectionRequest.numMutualConnections > 0) ? 
                <span>{receivedConnectionRequest.numMutualConnections} Mutual Connection{receivedConnectionRequest.numMutualConnections === 1 ? '' : 's'}</span> : null
            }
          </div>
          
        </div>
        <div style={{height: '30px'}}></div>
      </React.Fragment>
      
    );

  }
}

ReceivedConnectionRequestTile.propTypes = {
  // logout: PropTypes.func.isRequired,
  // security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.security.user,
  // isConnected: state.connectionReducer.isConnected,
  // connectionRequestSent: state.connectionRequestReducer.connectionRequestSent,
  // connectionRequestReceived: state.connectionRequestReducer.connectionRequestReceived,
  // security: state.security,
  // firstContactId: state.contactReducer.firstContactId,
});

export default withRouter(connect(
  mapStateToProps,
  { 
    getIsConnected, 
    sendConnectionRequest,
    acceptConnectionRequest,
    deleteConnectionRequest,
    createContactIfNotExist,
  }
)(ReceivedConnectionRequestTile));