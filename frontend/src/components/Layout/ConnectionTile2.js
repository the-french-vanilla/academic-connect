import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import { getIsConnected, unconnect } from "../../actions/connectionActions";
import { 
  sendConnectionRequest,
  acceptConnectionRequest,
  deleteConnectionRequest 
} from "../../actions/connectionRequestActions";
import { createContactIfNotExist } from "../../actions/contactActions";

class ConnectionTile2 extends Component {
  constructor() {
    super();
    this.state = {
      profilePictureBinary: null
    };

    // this.connect = this.connect.bind(this);
    this.message = this.message.bind(this);
  }

  async componentDidMount() {
    const { connection } = this.props;
    const res = await axios.get("http://localhost:8081/api/users/profilepicture/" + connection.user2.username);
    this.setState({ profilePictureBinary: res.data });
  }

  // connect(username) {
  //   this.props.sendConnectionRequest(username);
  // }

  // accept(username, page, q) {
  //   this.props.acceptConnectionRequest(username, page, q);
  // }

  // delete(username, page) {
  //   this.props.deleteConnectionRequest(username, page);
  // }

  unconnect(username) {
    this.props.unconnect(username);
  }

  message(username) {
    this.props.createContactIfNotExist(username, this.props.history);
  }

  render() {
    const { connection, user } = this.props;
    console.log(connection)

    let params = (new URL(document.location)).searchParams;
    let q = params.get("q");

    return (
      
      <React.Fragment>
        <div  className="container border round bg-light">
          <button style={{width: '100px', float: 'right'}} onClick={() => this.unconnect(connection.user2.username)}>Unconnect</button>
          <img alt="" height="80" width="80" style={{padding: '10px', float: 'left'}} src={'data:image/gif;base64,' + this.state.profilePictureBinary} />
          {/* <div style={{padding: '10px'}}>
            <span><b>{connection.user2.firstName + ' ' + connection.user2.lastName}</b></span><br />
            <div className="col-9"></div>
            <div className="col-3">
              <button onClick={() => this.unconnect(connection.user2.username)}>Unconnect</button>
            </div>
          </div> */}
          <Link className="nav-link" to={'/ac/' + connection.user2.username}>
              <span><b>{connection.user2.firstName + " " + connection.user2.lastName}</b></span>
            </Link>
            <br />
            <div id="spacing"></div>
            <span>{connection.user2.headline}</span><br />
            <div id="spacing"></div>
            {
              (connection.numMutualConnections > 0) ? 
                <span>{connection.numMutualConnections} Mutual Connection{connection.numMutualConnections === 1 ? '' : 's'}</span> : null
            }
            
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
    sendConnectionRequest,
    acceptConnectionRequest,
    deleteConnectionRequest,
    createContactIfNotExist,
    unconnect,
  }
)(ConnectionTile2));