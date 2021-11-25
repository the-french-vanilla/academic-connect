import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createNewEducation, getAllEducations } from "../../actions/educationActions";
import { getNumberOfPublications } from "../../actions/publicationActions";

class ProfileTab extends Component {
  componentDidMount() {
    this.props.getAllEducations();
    this.props.getNumberOfPublications();
  }

  render() {
    const { user, userProfile, educations, numPublications } = this.props;

    return (
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="posts">
            <Link className="nav-link" to={'/ac/' + user.username} id="posts-tab" data-toggle="tab" role="tab" aria-controls="posts" aria-selected="false">
              Posts
            </Link>
          </li>
          <li className="nav-item" role="profile">
            <Link className="nav-link active" to={'/ac/' + user.username + '/profile'} id="profile-tab" data-toggle="tab" role="tab" aria-controls="profile" aria-selected="true">
              Profile
            </Link>
          </li>
          <li className="nav-item" role="publications">
            <Link className="nav-link" to={'/ac/' + user.username + '/publications'} id="publications-tab" data-toggle="tab" role="tab" aria-controls="publications" aria-selected="false">
              Publications
            </Link>
          </li>
          <li className="nav-item" role="connections">
            <Link className="nav-link" to={'/ac/' + user.username + '/connections'} id="connections-tab" data-toggle="tab" role="tab" aria-controls="connections" aria-selected="false">
              Connections
            </Link>
          </li>
          <li className="nav-item" role="groups">
            <Link className="nav-link" to={'/ac/' + user.username + '/groups'} id="groups-tab" data-toggle="tab" role="tab" aria-controls="groups" aria-selected="false">
              Groups
            </Link>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent"></div>
          <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            
            <div style={{height: '30px'}}></div>

            <h4>About</h4>

            <div className="container border round bg-light">
            <p>{userProfile.about}</p>
            </div>

            <h4>Education</h4>

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

            <div style={{height: '30px'}}></div>

            <div className="container border round bg-light">
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
            </div>

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
});

export default connect(
  mapStateToProps,
  { createNewEducation, getAllEducations, getNumberOfPublications }
)(ProfileTab);