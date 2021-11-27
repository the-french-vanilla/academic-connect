import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import SecuredRoute from "../../securityUtils/SecureRoute";
import { getAllContacts, getContact } from "../../actions/contactActions";
import { getAllChatMessages } from "../../actions/chatMessageActions";
import SelectedContact from "./SelectedContact";

class Messaging extends Component {
  componentDidMount() {
    // const { firstContactId, firstOtherContactId } = this.props;
    this.props.getAllContacts();
    // this.props.getAllChatMessages(firstContactId, firstOtherContactId);
  }

  getContact(contactId) {
    this.props.getContact(contactId);
  }

  render() {
    const { match, contacts, chatMessages } = this.props;
    // const { firstContactId, firstOtherContactId } = this.props;
    return (
      <div className="messaging">
        <div style={{height: '10vh'}}></div>

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

                  {
                    contacts.map((contact) => 
                      <Link key={contact.id} onClick={() => this.getContact(contact.id)} className="list-group-item list-group-item-action border-0" to={match.path + '/thread/' + contact.id}>
                        <div className="badge bg-success float-right">5</div>
                        <div className="d-flex align-items-start">
                          <img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle mr-1" alt="Vanessa Tucker" width="40" height="40" />
                          <div className="flex-grow-1 ml-3">
                            {contact.user2.firstName + ' ' + contact.user2.lastName}
                            <div className="small"><span className="fas fa-circle chat-online"></span> Online</div>
                          </div>
                        </div>
                      </Link>

                      // <a href="#" key={contact.id} className="list-group-item list-group-item-action border-0">
                      //   <div className="badge bg-success float-right">5</div>
                      //   <div className="d-flex align-items-start">
                      //     <img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle mr-1" alt="Vanessa Tucker" width="40" height="40" />
                      //     <div className="flex-grow-1 ml-3">
                      //       {contact.user2.firstName + ' ' + contact.user2.lastName}
                      //       <div className="small"><span className="fas fa-circle chat-online"></span> Online</div>
                      //     </div>
                      //   </div>
                      // </a>
                    )
                  }

                  <hr className="d-block d-lg-none mt-1 mb-0" />
                </div>

                <Switch>
                  <SecuredRoute exact path={match.path + "/thread/:contact_id"} component={SelectedContact} />
                </Switch>

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
});

export default connect(
  mapStateToProps,
  { getAllContacts, getContact, getAllChatMessages }
)(Messaging);