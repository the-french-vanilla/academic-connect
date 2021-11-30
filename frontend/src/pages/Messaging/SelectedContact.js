import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createNewChatMessage } from "../../actions/chatMessageActions";
import { getContact } from "../../actions/contactActions";
import axios from "axios";

import { getProfilePicture } from "../../actions/securityActions";
import RightMessage from "../../components/Layout/RightMessage";
import LeftMessage from "../../components/Layout/LeftMessage";

class SelectedContact extends Component {
  constructor() {
    super();

    this.state = {
      // activeContact: {},
      text: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    this.props.getContact(match.params.contact_id);
  }

  updateText(e) {
    this.setState({
      text: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    // const ChatMessageRequest = {
    //   contactId: this.props.firstContactId,
    //   text: this.state.text,
    // };

    // console.log(ChatMessageRequest)

    // const { firstContactId, firstOtherContactId } = this.props;

    // console.log('text: ' + this.state.text)
    // console.log('username: ' + this.props.contact.user2.username)
    // console.log('contactId: ' + this.props.contact.id)
    // console.log('otherContactId: ' + this.props.otherContactId)

    // this.props.createNewChatMessage(ChatMessageRequest, this.props.contact.user2.id);

    this.props.createNewChatMessage(this.state.text, this.props.contact.user2.username,
      this.props.contact.id, this.props.otherContactId);

    this.setState({
      text: ""
    });

    // window.location.href = "/";
  }

  render() {
    const { contact, chatMessages, profilePictureBinary } = this.props;

    if (contact == null) {
      return null;
    } else {

      return (
        <div className="col-12 col-lg-7 col-xl-9">
          <div className="py-2 px-4 border-bottom d-none d-lg-block">
            <div className="d-flex align-items-center py-1">
              <div className="position-relative">
                <img alt="" src={'data:image/gif;base64,' + profilePictureBinary} className="rounded-circle mr-1"  width="40" height="40" />
              </div>
              <div className="flex-grow-1 pl-3">
                <strong>{contact.user2.firstName + ' ' + contact.user2.lastName}</strong>
                {/* <div className="text-muted small"><em>Typing...</em></div> */}
              </div>
              {/* <div>
                <button className="btn btn-primary btn-lg mr-1 px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone feather-lg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button>
                <button className="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-video feather-lg"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg></button>
                <button className="btn btn-light border btn-lg px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal feather-lg"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
              </div> */}
            </div>
          </div>

          <div className="position-relative">
            <div className="chat-messages p-4">

            {
              chatMessages.map((chatMessage) => {
                if (chatMessage.user1.id === contact.user1.id) {
                  return (
                    <RightMessage key={chatMessage.id} chatMessage={chatMessage} />
                  );
                } else {
                  return (
                    <LeftMessage key={chatMessage.id} chatMessage={chatMessage} />
                  );
                }
              })
            }

            </div>
          </div>

          <div className="flex-grow-0 py-3 px-4 border-top">
            <div className="input-group">
              <input type="text" value={this.state.text} onChange={this.updateText} className="form-control" placeholder="Type your message" />
              <button className="btn btn-primary" disabled={this.state.text == "" ? 'disabled' : ''} onClick={this.onSubmit}>Send</button>
            </div>
          </div>

        </div>
      );

    }
  }
}

const mapStateToProps = state => ({
  contact: state.contactReducer.contact,
  otherContactId: state.contactReducer.otherContactId,
  chatMessages: state.chatMessageReducer.chatMessages,
  profilePictureBinary: state.security.profilePictureBinary,

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
  { createNewChatMessage, getContact, getProfilePicture }
)(SelectedContact);