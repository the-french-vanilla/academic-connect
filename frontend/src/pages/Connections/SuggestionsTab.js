import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { 
  getConnectionRecommendations, 
} from "../../actions/connectionActions";
import UserTile from "../../components/Layout/UserTile";

class SuggestionsTab extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getConnectionRecommendations(this.props.user.username);
  }

  render() {
    const { userProfilesSuggestion } = this.props;
    console.log(userProfilesSuggestion)
    return (
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="all-connections">
            <Link className="nav-link" to="/connections" id="all-connections-tab" data-toggle="tab" role="tab" aria-controls="all-connections" aria-selected="false">
              All Connections
            </Link>
          </li>
          <li className="nav-item" role="connection-requests">
            <Link className="nav-link" to="/connections/requests" id="connection-requests-tab" data-toggle="tab" role="tab" aria-controls="connection-requests" aria-selected="false">
              Connection Requests
            </Link>
          </li>
          <li className="nav-item" role="suggestions">
            <Link className="nav-link active" to="/connections/suggestions" id="suggestions-tab" data-toggle="tab" role="tab" aria-controls="suggestions" aria-selected="true">
              Suggestions
            </Link>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="suggestions" role="tabpanel" aria-labelledby="suggestions-tab">
            
            <div style={{height: '30px'}}></div>
           
           <div className="container">
              <h3>Suggestions</h3>
 
              <div className="row">
              <div className="col">
              {/* {
                 userProfilesSuggestion.length > 0 ? (
                  userProfilesSuggestion.map((connection) =>
                     <ConnectionTile2 key={connection.id} connection={connection} />
                   ) 
                 ) : <div>You do not have any connections. Start connecting with people.</div>
               } */}

                {
                  userProfilesSuggestion.map((userProfile) => 
                    <UserTile key={userProfile.id} userProfile={userProfile} />
                  )
                }
               </div>
              </div>
           </div>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.security.user,
  userProfilesSuggestion: state.userProfileReducer.userProfilesSuggestion,
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
  { getConnectionRecommendations, }
)(SuggestionsTab);