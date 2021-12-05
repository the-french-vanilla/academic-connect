import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../actions/userProfileActions";
import { createNewEducation, getAllEducations } from "../../actions/educationActions";
import { getNumberOfPublications, getAllPublications } from "../../actions/publicationActions";

class ProfileTab extends Component {
  constructor() {
    super();
    this.state = {
      headline: "",
      about: "",
    };

    this.onChange = this.onChange.bind(this);
    this.updateHeadlineAboutOnSubmit = this.updateHeadlineAboutOnSubmit.bind(this);
  }

  componentDidMount() {
    const { match, user } = this.props;
    this.props.getUserProfile(match.params.username, user.username);
    this.props.getAllEducations(match.params.username);
    this.props.getAllPublications(match.params.username);
    this.props.getNumberOfPublications();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  updateHeadlineAbout(headline, about) {
    this.setState({ headline: headline, about: about });
  }

  updateHeadlineAboutOnSubmit(e) {
    e.preventDefault();

    // console.log(this.state.headline)
    // console.log(this.state.about)
    // console.log('updateHeadlineAboutOnSubmit')

    this.props.updateUserProfile(this.state.headline, this.state.about, this.props.user.username);
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

            <div className="container">

              {
                (user.username === match.params.username) ? (
                  <div style={{float: 'right', margin: '10px'}}>
                    <button onClick={() => this.updateHeadlineAbout(userProfile.headline, userProfile.about)} data-toggle="modal" data-target="#modalUpdateHeadlineAboutForm">Update</button>
                  </div>
                ) : null
              }

              <div style={{height: '30px'}}></div>

              <h4>About</h4>

              <div className="container border round bg-light" style={{minHeight: '100px'}}>
                {aboutHTML}
              </div>

              {
                (user.username === match.params.username) ? (
                  <div style={{float: 'right', margin: '10px'}}>
                    <a href="" className="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalAddEducationForm">
                      Add Education
                    </a>
                  </div>
                ) : null
              }

              <div style={{height: '30px'}}></div>

              {
                (educations.length > 0 || user.username === match.params.username) ? <h4>Education</h4> : null
              }

              <div style={{height: '10px'}}></div>

              {
                educations.map((education) =>
                  <div key={education.id} >
                    <div className="container border round bg-light" style={{minHeight: '100px'}}>
                      {
                        (user.username === match.params.username) ? (
                          <React.Fragment>
                            <div style={{float: 'right', margin: '10px'}}>
                              <button data-toggle="modal" data-target="#modalDeleteEducationForm">Delete</button>
                            </div>
                            <div style={{float: 'right', margin: '10px'}}>
                              <button data-toggle="modal" data-target="#modalUpdateEducationForm">Update</button>
                            </div>
                          </React.Fragment>
                        ) : null
                      }
                      <div style={{margin: '10px'}}>
                        <span style={{float: 'right'}}>{education.startDate + ' to ' + education.endDate}</span>
                        <span><b>{education.institution} </b></span>
                        <div style={{height: '10px'}}></div>
                        {education.accreditation}
                        <div style={{height: '10px'}}></div>
                        <span>{education.description}</span>
                      </div>
                    </div>
                    <div style={{height: '30px'}}></div>
                  </div>
                )
              }

              {
                (user.username === match.params.username) ? (
                  <div style={{float: 'right', margin: '10px'}}>
                    <a href="" className="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalAddPublicationForm">
                      Add Publication
                    </a>
                  </div>
                ) : null
              }

              <div style={{height: '30px'}}></div>

              {
                (publications.length > 0 || user.username === match.params.username) ? <h4>Publications</h4> : null
              }

              <div style={{height: '10px'}}></div>

              {
                publications.map((publication) =>
                  <div key={publication.id}>
                    <div className="container border round bg-light" style={{minHeight: '100px'}}>
                      {
                        (user.username === match.params.username) ? (
                          <React.Fragment>
                            <div style={{float: 'right', margin: '10px'}}>
                              <button data-toggle="modal" data-target="#modalDeletePublicationForm">Delete</button>
                            </div>
                            <div style={{float: 'right', margin: '10px'}}>
                              <button data-toggle="modal" data-target="#modalUpdatePublicationForm">Update</button>
                            </div>
                          </React.Fragment>
                        ) : null
                      }
                      <div style={{margin: '10px'}}>
                        <span style={{float: 'right'}}>{publication.date}</span>
                        <span><b>{publication.title}</b></span><br />
                        <div id="spacing"></div>
                        <span>{publication.authors}</span>
                      </div>
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

          {/* Update About modal */}

          <div className="modal fade" id="modalUpdateHeadlineAboutForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
              <form onSubmit={this.updateHeadlineAboutOnSubmit}>
              <div className="modal-content">
                <div className="modal-header text-center">
                  <h4 className="modal-title w-100 font-weight-bold">Update About</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body mx-3">
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-headline">Headline</label>
                    <input type="text" id="defaultForm-headline" name="headline" onChange={this.onChange} value={this.state.headline} className="form-control validate" />
                  </div>
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                    <textarea id="defaultForm-about" name="about" onChange={this.onChange} value={this.state.about} className="form-control validate" style={{minHeight: '150px'}} />
                    {/* <label data-error="wrong" data-success="right" for="defaultForm-about">About</label> */}
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button type="submit" className="btn btn-default">Update</button>
                  {/* <input type="submit" className="btn btn-default" value="Update" /> */}
                </div>
              </div>
              </form>
            </div>
          </div>

          {/* Add Education modal */}

          <div className="modal fade" id="modalAddEducationForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header text-center">
                  <h4 className="modal-title w-100 font-weight-bold">Add Education</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body mx-3">
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-institution">Institution</label>
                    <input type="text" id="defaultForm-institution" className="form-control validate" />
                  </div>

                  <div className="md-form mb-5">
                    {/* <i className="fas fa-lock prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-accreditation">Accreditation</label>
                    <input type="text" id="defaultForm-accreditation" className="form-control validate" />
                  </div>

                  <div className="md-form mb-5">
                    {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-start-date">Start Date</label>
                    <input type="date" id="defaultForm-start-date" className="form-control validate"></input>
                  </div>

                  <div className="md-form mb-5">
                    {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-end-date">End Date</label>
                    <input type="date" id="defaultForm-end-date" className="form-control validate"></input>
                  </div>
                  
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-description">Description</label>
                    <textarea id="defaultForm-description" className="form-control validate" style={{minHeight: '150px'}} />
                  </div>

                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button className="btn btn-default">Add Education</button>
                </div>
              </div>
            </div>
          </div>

          {/* Update Education Modal */}

          <div className="modal fade" id="modalUpdateEducationForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header text-center">
                  <h4 className="modal-title w-100 font-weight-bold">Update Education</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body mx-3">
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-institution">Institution</label>
                    <input type="text" id="defaultForm-institution" className="form-control validate" />
                  </div>

                  <div className="md-form mb-5">
                    {/* <i className="fas fa-lock prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-accreditation">Accreditation</label>
                    <input type="text" id="defaultForm-accreditation" className="form-control validate" />
                  </div>

                  <div className="md-form mb-5">
                    {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-start-date">Start Date</label>
                    <input type="date" id="defaultForm-start-date" className="form-control validate"></input>
                  </div>

                  <div className="md-form mb-5">
                    {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-end-date">End Date</label>
                    <input type="date" id="defaultForm-end-date" className="form-control validate"></input>
                  </div>
                  
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-description">Description</label>
                    <textarea id="defaultForm-description" className="form-control validate" style={{minHeight: '150px'}} />
                  </div>

                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button className="btn btn-default">Update Education</button>
                </div>
              </div>
            </div>
          </div>

          {/* Delete Education Modal */}

          <div className="modal fade" id="modalDeleteEducationForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header text-center">
                  <h4 className="modal-title w-100 font-weight-bold">Delete Education</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body mx-3">
                  Are you sure?
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button className="btn btn-danger">Delete</button>
                  <button className="btn btn-default">Cancel</button>
                </div>
              </div>
            </div>
          </div>

          {/* Add Publication Modal */}

          <div className="modal fade" id="modalAddPublicationForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header text-center">
                  <h4 className="modal-title w-100 font-weight-bold">Add Publication</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body mx-3">
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-lock prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-title">Title</label>
                    <input type="text" id="defaultForm-title" className="form-control validate" />
                  </div>
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-publication-date">Publication Date</label>
                    <input type="date" id="defaultForm-publication-date" className="form-control validate"></input>
                  </div>
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-lock prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-authors">Authors</label>
                    <input type="text" id="defaultForm-authors" className="form-control validate" />
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button className="btn btn-default">Add Publication</button>
                </div>
              </div>
            </div>
          </div>

          {/* Update Publication Modal */}

          <div className="modal fade" id="modalUpdatePublicationForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header text-center">
                  <h4 className="modal-title w-100 font-weight-bold">Update Publication</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body mx-3">
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-lock prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-title">Title</label>
                    <input type="text" id="defaultForm-title" className="form-control validate" />
                  </div>
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-publication-date">Publication Date</label>
                    <input type="date" id="defaultForm-publication-date" className="form-control validate"></input>
                  </div>
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-lock prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-authors">Authors</label>
                    <input type="text" id="defaultForm-authors" className="form-control validate" />
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button className="btn btn-default">Update Publication</button>
                </div>
              </div>
            </div>
          </div>

          {/* Delete Publication Modal */}

          <div className="modal fade" id="modalDeletePublicationForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header text-center">
                  <h4 className="modal-title w-100 font-weight-bold">Delete Publication</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body mx-3">
                  Are you sure?
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button className="btn btn-danger">Delete</button>
                  <button className="btn btn-default">Cancel</button>
                </div>
              </div>
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
  publications: state.publicationReducer.publications,
});

export default connect(
  mapStateToProps,
  { 
    createNewEducation, getAllEducations, getNumberOfPublications,
    getAllPublications, getUserProfile, updateUserProfile,
  }
)(ProfileTab);