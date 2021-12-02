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
    this.message = this.message.bind(this);
  }

  async componentDidMount() {
    const { receivedConnectionRequest } = this.props;
    const res = await axios.get("http://localhost:8081/api/users/profilepicture/" + receivedConnectionRequest.user1.username);
    this.setState({ profilePictureBinary: res.data });
  }

  accept(username, page) {
    this.props.acceptConnectionRequest(username, page);
  }

  delete(username, page) {
    this.props.deleteConnectionRequest(username, page);
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

  message(username) {
    this.props.createContactIfNotExist(username, this.props.history);
  }

  render() {
    const { receivedConnectionRequest, user } = this.props;
    console.log(receivedConnectionRequest)

    let params = (new URL(document.location)).searchParams;
    let q = params.get("q");

    return (
      
      <div className="col">
        <div  className="container border round bg-light">
          <img alt="" height="80" width="80" style={{padding: '10px', float: 'left'}} src={'data:image/gif;base64,' + this.state.profilePictureBinary} />
          <div style={{padding: '10px'}}>
            <span><b>{receivedConnectionRequest.user1.firstName + ' ' + receivedConnectionRequest.user1.lastName}</b></span><br />
            {/* <div id="spacing"></div>
            <span>Post-Doctoral Fellow</span><br />
            <div id="spacing"></div>
            <span>4 Mutual Connections</span> */}
            <div className="col-9"></div>
            <div className="col-3">
              <button onClick={() => this.accept(receivedConnectionRequest.user1.username, 'connections')}>Accept</button>
              <button onClick={() => this.delete(receivedConnectionRequest.user1.username, 'connections')}>Delete</button>
            </div>
          </div>
        </div>
      </div>  
      
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