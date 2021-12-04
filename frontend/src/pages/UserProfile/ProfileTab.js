import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserProfile } from "../../actions/userProfileActions";
import { createNewEducation, getAllEducations } from "../../actions/educationActions";
import { getNumberOfPublications, getAllPublications } from "../../actions/publicationActions";

class ProfileTab extends Component {
  componentDidMount() {
    const { match, user } = this.props;
    this.props.getUserProfile(match.params.username, user.username);
    this.props.getAllEducations(match.params.username);
    this.props.getAllPublications(match.params.username);
    this.props.getNumberOfPublications();
  }

  render() {
    const { match, user, userProfile, educations, publications, numPublications } = this.props;

    let aboutHTML = null;
    if (userProfile == null) {
      return null;
    } else if (userProfile.about == null) {
      aboutHTML = <p>There's nothing interesting about {userProfile.user.firstName}</p>;
    } else {
      aboutHTML = <p>{userProfile.about}</p>;
    }

    return (
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="posts">
            <Link className="nav-link" to={'/ac/' + match.params.username} id="posts-tab" data-toggle="tab" role="tab" aria-controls="posts" aria-selected="false">
              Posts
            </Link>
          </li>
          <li className="nav-item" role="profile">
            <Link className="nav-link active" to={'/ac/' + match.params.username + '/profile'} id="profile-tab" data-toggle="tab" role="tab" aria-controls="profile" aria-selected="true">
              Profile
            </Link>
          </li>
          {/* <li className="nav-item" role="publications">
            <Link className="nav-link" to={'/ac/' + match.params.username + '/publications'} id="publications-tab" data-toggle="tab" role="tab" aria-controls="publications" aria-selected="false">
              Publications
            </Link>
          </li> */}
          <li className="nav-item" role="connections">
            <Link className="nav-link" to={'/ac/' + match.params.username + '/connections'} id="connections-tab" data-toggle="tab" role="tab" aria-controls="connections" aria-selected="false">
              Connections
            </Link>
          </li>
          <li className="nav-item" role="groups">
            <Link className="nav-link" to={'/ac/' + match.params.username + '/groups'} id="groups-tab" data-toggle="tab" role="tab" aria-controls="groups" aria-selected="false">
              Groups
            </Link>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent"></div>
          <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            
            <div style={{height: '30px'}}></div>

            <h4>About</h4>

            <div className="container border round bg-light">
            {aboutHTML}
            </div>

            {
              educations.length > 0 ? <h4>Education</h4> : null
            }

            {
              educations.map((education) =>
                <div key={education.id} >
                  <div className="container border round bg-light">
                    <span><b>{education.institution} </b></span>({education.startDate + ' to ' + education.endDate})
                    <div style={{height: '10px'}}></div>
                    {education.accreditation}
                    <div style={{height: '10px'}}></div>
                    <span>{education.description}</span>
                  </div>
                  <div style={{height: '30px'}}></div>
                </div>
              )
            }

            {
              publications.length > 0 ? <h4>Publications</h4> : null
            }

            {
              publications.map((publication) =>
                <div key={publication.id}>
                  <div className="container border round bg-light">
                    <span style={{float: 'right'}}>{publication.date}</span>
                    <span><b>{publication.title}</b></span><br />
                    <div id="spacing"></div>
                    <span>{publication.authors}</span>
                  </div>
                  <div style={{height: '30px'}}></div>
                </div>
              )
            }

            <div style={{height: '30px'}}></div>

            {/* <div className="container border round bg-light">
              <span><b>Publications</b></span>
              <span style={{float: 'right'}}>{numPublications}</span><br />
              <span><b>Citations</b></span>
              <span style={{float: 'right'}}>233</span>
            </div>

            <div style={{height: '30px'}}></div>

            <div className="container border round bg-light">
              <span><b>Co-authors:</b></span><br />
              <span>G. M. Adam Pazdor</span><br />
              <span>Trevor L. Cook</span><br />
              <span>Edson M. Dela Cruz</span><br />
              <span>Patrick M. J. Dubois</span><br />
              <span>Zhao Han</span>
            </div> */}

          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  educations: state.educationReducer.educations,
  user: state.security.user,  
  numPublications: state.publicationReducer.numPublications,
  userProfile: state.userProfileReducer.userProfile,
  publications: state.publicationReducer.publications,
});

export default connect(
  mapStateToProps,
  { 
    createNewEducation, getAllEducations, getNumberOfPublications,
    getAllPublications, getUserProfile, 
  }
)(ProfileTab);