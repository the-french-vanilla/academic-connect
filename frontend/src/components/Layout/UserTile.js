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

class UserTile extends Component {
  constructor() {
    super();
    this.state = {
      profilePictureBinary: null
    };

    // this.connect = this.connect.bind(this);
    // this.accept = this.accept.bind(this);
    // this.delete = this.delete.bind(this);
    // this.message = this.message.bind(this);
  }

  async componentDidMount() {
    const { userProfile } = this.props;
    const res = await axios.get("http://localhost:8081/api/users/profilepicture/" + userProfile.user.username);
    this.setState({ profilePictureBinary: res.data });
  }

  connect(username2, username, page, q) {
    this.props.sendConnectionRequest(username2, username, page, q);

    // let params = (new URL(document.location)).searchParams;
    // let q = params.get("q");
    // //this.props.history.push("/search/results/?q=" + q);
    // window.location.href = "/search/results/?q=" + q;
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
    const { userProfile, user } = this.props;
    console.log(userProfile)

    let params = (new URL(document.location)).searchParams;
    let q = params.get("q");

    let connectionButton = null;
    if (!userProfile.connected && (userProfile.user.username !== user.username)) {
      if (userProfile.connectionRequestSent) {
        connectionButton = (
          <div style={{float: 'right', margin: '10px'}}>
            <button style={{cursor: 'not-allowed'}}>Connection Request Sent</button>
          </div>
        );
      } else if (userProfile.connectionRequestReceived) {
        connectionButton = (
          <React.Fragment>
            <div style={{float: 'right', margin: '10px'}}>
              <button onClick={() => this.delete(userProfile.user.username, user.username, 'searchResults', q)}>Reject Connection Request</button>
            </div>
            <div style={{float: 'right', margin: '10px'}}>
              <button onClick={() => this.accept(userProfile.user.username, user.username, 'searchResults', q)}>Accept Connection Request</button>
            </div>
          </React.Fragment>
        );
      } else {
        connectionButton = (
          <div style={{float: 'right', margin: '10px'}}>
            <button onClick={() => this.connect(userProfile.user.username, user.username, 'searchResults', q)}>Connect</button>
          </div>
        );
      }
    }

    return (
      <div className="row">
      <div className="col">
        <div className="container border round bg-light" style={{minHeight: '100px'}}>
          <img alt="" height="80" width="80" style={{padding: '10px', float: 'left'}} src={'data:image/gif;base64,' + this.state.profilePictureBinary} />
          <div style={{padding: '10px'}}>
            {
              (userProfile.user.username !== user.username) ? (
                <div style={{float: 'right', margin: '10px'}}>
                  <button onClick={() => this.message(userProfile.user.username)}>Message</button>
                </div>
              ) : null
            }
            {connectionButton}

            <Link className="nav-link" to={'/ac/' + userProfile.user.username}>
              <span><b>{userProfile.user.firstName + " " + userProfile.user.lastName}</b></span>
            </Link>
            <div>{userProfile.headline}</div>
            {
              ((userProfile.numMutualConnections > 0) && (userProfile.user.username !== user.username)) ? 
                <span>{userProfile.numMutualConnections} Mutual Connection{userProfile.numMutualConnections === 1 ? '' : 's'}</span> : null
            }
          </div>
          
        </div>
        <div style={{height: '30px'}}></div>
      </div>  
      </div>
    );

  }
}

UserTile.propTypes = {
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
)(UserTile));