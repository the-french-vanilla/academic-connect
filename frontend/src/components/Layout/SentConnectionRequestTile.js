import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import { getIsConnected } from "../../actions/connectionActions";
import { 
  cancelConnectionRequest,
} from "../../actions/connectionRequestActions";
import { createContactIfNotExist } from "../../actions/contactActions";

class SentConnectionRequestTile extends Component {
  constructor() {
    super();
    this.state = {
      profilePictureBinary: null
    };

    // this.connect = this.connect.bind(this);
    // this.message = this.message.bind(this);
  }

  async componentDidMount() {
    const { sentConnectionRequest } = this.props;
    const res = await axios.get("http://localhost:8081/api/users/profilepicture/" + sentConnectionRequest.user2.username);
    this.setState({ profilePictureBinary: res.data });
  }

  cancel(username) {
    this.props.cancelConnectionRequest(username);
  }

  message(username) {
    this.props.createContactIfNotExist(username, this.props.history);
  }

  render() {
    const { match, sentConnectionRequest, user } = this.props;
    // console.log(connection)

    let params = (new URL(document.location)).searchParams;
    let q = params.get("q");

    let messageButton = (
      <div style={{float: 'right', margin: '10px'}}>
        <button onClick={() => this.message(sentConnectionRequest.user2.username)}>Message</button>
      </div>
    );
    // let connectButton = (
    //   <button style={{width: '100px', margin: '10px', float: 'right'}} onClick={() => this.connect(connection.user2.username)}>Connect</button>
    // );


    let connectionButton = null;
    connectionButton = (
      <div style={{float: 'right', margin: '10px'}}>
        <button onClick={() => this.cancel(sentConnectionRequest.user2.username)}>Cancel</button>
      </div>
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
            <Link className="nav-link" to={'/ac/' + sentConnectionRequest.user2.username}>
              <span><b>{sentConnectionRequest.user2.firstName + " " + sentConnectionRequest.user2.lastName}</b></span>
            </Link>
            <div>{sentConnectionRequest.headline}</div>
            {
              (sentConnectionRequest.numMutualConnections > 0) ? 
                <span>{sentConnectionRequest.numMutualConnections} Mutual Connection{sentConnectionRequest.numMutualConnections === 1 ? '' : 's'}</span> : null
            }
          </div>
          
        </div>
        <div style={{height: '30px'}}></div>
      </React.Fragment>
      
    );

  }
}

SentConnectionRequestTile.propTypes = {
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
    cancelConnectionRequest,
    createContactIfNotExist,
  }
)(SentConnectionRequestTile));