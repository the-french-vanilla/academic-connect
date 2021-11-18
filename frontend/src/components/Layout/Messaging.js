import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllContacts } from "../../actions/contactActions";
import { createNewChatMessage, getAllChatMessages } from "../../actions/chatMessageActions";

class Messaging extends Component {
  constructor() {
    super();

    this.state = {
      activeContact: {},
      text: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  componentDidMount() {
    const { firstContactId, firstOtherContactId } = this.props;
    this.props.getAllContacts();
    this.props.getAllChatMessages(firstContactId, firstOtherContactId);
  }

  updateText(e) {
    this.setState({
      text: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const ChatMessageRequest = {
      contactId: this.props.firstContactId,
      text: this.state.text,
    };

    console.log(ChatMessageRequest)

    const { firstContactId, firstOtherContactId } = this.props;

    this.props.createNewChatMessage(ChatMessageRequest, firstContactId, firstOtherContactId);

    this.setState({
      text: ""
    });

    // window.location.href = "/";
  }

  render() {
    const { contacts, chatMessages } = this.props;
    const { firstContactId, firstOtherContactId } = this.props;
    return (
      <div className="messaging">
        <div id="container">
          <aside>
            <header>
              <input type="text" placeholder="search" />
            </header>
            <ul>
              {
                contacts.map((contact) =>
                  <li key={contact.id}>
                    <img src="#" alt="" />
                    <div>
                      <h2>{contact.user2.firstName + ' ' + contact.user2.lastName}</h2>
                      <h3>
                        <span className="status orange"></span>
                        offline
                      </h3>
                    </div>
                  </li>
                )
              }
            </ul>
          </aside>
          <main>
            <header>
              <img src="#" alt="" />
              <div>
                <h2>David Casperson</h2>
              </div>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png" alt="" />
            </header>
            <ul id="chat">
            {
                chatMessages.map((chatMessage) => {
                  if (chatMessage.user1.id === firstContactId) {
                    return (
                      <li key={chatMessage.id} className="me">
                        <div className="entete">
                          <h3>{chatMessage.createAt}</h3>
                          <h2>{chatMessage.user1.firstName + ' ' + chatMessage.user1.lastName}</h2>
                          <span className="status blue"></span>
                        </div>
                        <div className="triangle"></div>
                        <div className="message">
                          {chatMessage.text}
                        </div>
                      </li>
                    );
                  } else {
                    return (
                      <li key={chatMessage.id} className="you">
                        <div className="entete">
                          <span className="status green"></span>
                          <h3>{chatMessage.createAt}</h3>
                          <h2>{chatMessage.user1.firstName + ' ' + chatMessage.user1.lastName}</h2>
                        </div>
                        <div className="triangle"></div>
                        <div className="message">
                        {chatMessage.text}
                        </div>
                      </li>
                    );
                  }
                })
              }
            </ul>
            <footer>
              <textarea value={this.state.text} onChange={this.updateText} placeholder="Type your message"></textarea>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png" alt="" />
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png" alt="" />
              <a disabled={this.state.text == "" ? 'disabled' : ''} onClick={this.onSubmit}>Send</a>
            </footer>
          </main>
        </div>
      </div>
    );
  }
}

Messaging.propTypes = {

};

const mapStateToProps = state => ({
  contacts: state.contactReducer.contacts,
  firstContactId: state.contactReducer.firstContactId,
  firstOtherContactId: state.contactReducer.firstOtherContactId,
  chatMessages: state.chatMessageReducer.chatMessages,
});

export default connect(
  mapStateToProps,
  { getAllContacts, createNewChatMessage, getAllChatMessages }
)(Messaging);