import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import SecuredRoute from "../../securityUtils/SecureRoute";
import { getAllContacts } from "../../actions/contactActions";
import { createNewChatMessage, getAllChatMessages } from "../../actions/chatMessageActions";

function Test() {
  return <h1>Hello</h1>
}

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
    // const { firstContactId, firstOtherContactId } = this.props;
    this.props.getAllContacts();
    // this.props.getAllChatMessages(firstContactId, firstOtherContactId);
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
    const { match, contacts, chatMessages } = this.props;
    // const { firstContactId, firstOtherContactId } = this.props;
    return (
      <div className="messaging">
        <div style={{height: '10vh'}}></div>

        <Switch>
          <SecuredRoute exact path={match.path + "/thread"} component={Test} />
        </Switch>

        <main className="content">
          <div className="container p-0">

            <div className="card">
              <div className="row g-0">
                <div className="col-12 col-lg-5 col-xl-3 border-right">

                  <div className="px-4 d-none d-md-block">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <input type="text" className="form-control my-3" placeholder="Search..." />
                      </div>
                    </div>
                  </div>

                  {/* {
                    contacts.map((contact) => 
                      <a href="#" key={contact.id} className="list-group-item list-group-item-action border-0">
                        <div className="badge bg-success float-right">5</div>
                        <div className="d-flex align-items-start">
                          <img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle mr-1" alt="Vanessa Tucker" width="40" height="40" />
                          <div className="flex-grow-1 ml-3">
                            {contact.user2.firstName + ' ' + contact.user2.lastName}
                            <div className="small"><span className="fas fa-circle chat-online"></span> Online</div>
                          </div>
                        </div>
                      </a>
                    )
                  } */}

                  <hr className="d-block d-lg-none mt-1 mb-0" />
                </div>




                
                <div className="col-12 col-lg-7 col-xl-9">
                  <div className="py-2 px-4 border-bottom d-none d-lg-block">
                    <div className="d-flex align-items-center py-1">
                      <div className="position-relative">
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                      </div>
                      <div className="flex-grow-1 pl-3">
                        <strong>Sharon Lessman</strong>
                        <div className="text-muted small"><em>Typing...</em></div>
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

                    {/* {
                      chatMessages.map((chatMessage) => {
                        if (chatMessage.user1.id === firstContactId) {
                          return (
                            <div key={chatMessage.id} className="chat-message-right mb-4">
                              <div>
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40" />
                                <div className="text-muted small text-nowrap mt-2">{chatMessage.createAt}</div>
                              </div>
                              <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                <div className="font-weight-bold mb-1">You</div>
                                {chatMessage.text}
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div key={chatMessage.id} className="chat-message-left pb-4">
                              <div>
                                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                                <div className="text-muted small text-nowrap mt-2">{chatMessage.createAt}</div>
                              </div>
                              <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                <div className="font-weight-bold mb-1">{chatMessage.user2.firstName + ' ' + chatMessage.user2.lastName}</div>
                                {chatMessage.text}
                              </div>
                            </div>
                          );
                        }
                      })
                    } */}

                    </div>
                  </div>

                  <div className="flex-grow-0 py-3 px-4 border-top">
                    <div className="input-group">
                      <input type="text" value={this.state.text} onChange={this.updateText} className="form-control" placeholder="Type your message" />
                      <button className="btn btn-primary" disabled={this.state.text == "" ? 'disabled' : ''} onClick={this.onSubmit}>Send</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
        </div>
      </main>




        {/* <div className="container">
          <div className="row">
            <div className="col-8">
              <div  className="card">
                <div className="create_input d_flex">
                  <div className="profile_thumb rounded-img">
                    <img src="/Users/deeppatel/Desktop/terry.jpeg" alt="" height="20" width="20" />
                  </div>
                  <div style={{float: 'right'}}>
                    <h4>John Doe</h4>
                    <h6>Active</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4"></div>
          </div>
        </div>
        
        <div id="container">
          <aside>
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
        </div> */}
      </div>
    );
  }
}

Messaging.propTypes = {

};

const mapStateToProps = state => ({
  contacts: state.contactReducer.contacts,
  // firstContactId: state.contactReducer.firstContactId,
  // firstOtherContactId: state.contactReducer.firstOtherContactId,
  chatMessages: state.chatMessageReducer.chatMessages,
});

export default connect(
  mapStateToProps,
  { getAllContacts, createNewChatMessage, getAllChatMessages }
)(Messaging);