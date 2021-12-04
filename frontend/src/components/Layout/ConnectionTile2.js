import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import { getIsConnected, unconnect } from "../../actions/connectionActions";

import { createContactIfNotExist } from "../../actions/contactActions";

class ConnectionTile2 extends Component {
  constructor() {
    super();
    this.state = {
      profilePictureBinary: null
    };

    // this.unconnect = this.unconnect.bind(this);
    // this.message = this.message.bind(this);
  }

  async componentDidMount() {
    const { connection } = this.props;
    const res = await axios.get("http://localhost:8081/api/users/profilepicture/" + connection.user2.username);
    this.setState({ profilePictureBinary: res.data });
  }

  unconnect(username2, username) {
    this.props.unconnect(username2, username);
  }

  message(username) {
    this.props.createContactIfNotExist(username, this.props.history);
  }

  render() {
    const { match, connection, user } = this.props;
    // console.log(connection)

    let params = (new URL(document.location)).searchParams;
    let q = params.get("q");

    let messageButton = (
      <div style={{float: 'right', margin: '10px'}}>
        <button onClick={() => this.message(connection.user2.username)}>Message</button>
      </div>
    );
    // let connectButton = (
    //   <button style={{width: '100px', margin: '10px', float: 'right'}} onClick={() => this.connect(connection.user2.username)}>Connect</button>
    // );


    let unconnectButton = null;
    unconnectButton = (
      <div style={{float: 'right', margin: '10px'}}>
        <button onClick={() => this.unconnect(connection.user2.username, connection.user1.username)}>Unconnect</button>
      </div>
    );

    return (
      
      <React.Fragment>
        <div className="container border round bg-light" style={{minHeight: '100px'}}>
          
          {
            (user.username !== connection.user2.username) ? messageButton : null
          }

          {
            unconnectButton 
          }

          <img alt="" height="80" width="80" style={{padding: '10px', float: 'left'}} src={'data:image/gif;base64,' + this.state.profilePictureBinary} />
          <div style={{padding: '10px'}}>
            <Link className="nav-link" to={'/ac/' + connection.user2.username}>
              <span><b>{connection.user2.firstName + " " + connection.user2.lastName}</b></span>
            </Link>
            <div>{connection.headline}</div>
            {
              (connection.numMutualConnections > 0) ? 
                <span>{connection.numMutualConnections} Mutual Connection{connection.numMutualConnections === 1 ? '' : 's'}</span> : null
            }
          </div>
          
        </div>
        <div style={{height: '30px'}}></div>
      </React.Fragment>
      
    );

  }
}

ConnectionTile2.propTypes = {
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
    unconnect,
    createContactIfNotExist,
  }
)(ConnectionTile2));