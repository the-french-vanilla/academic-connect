import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../actions/userProfileActions";
import { createNewEducation, getAllEducations, updateEducation, deleteEducation } from "../../actions/educationActions";
import { createNewPublication, getAllPublications, updatePublication, deletePublication } from "../../actions/publicationActions";

class ProfileTab extends Component {
  constructor() {
    super();
    this.state = {
      headline: "",
      about: "",

      educationId: 0,
      institution: "",
      accreditation: "",
      startDate: "", // YYYY-MM-DD
      endDate: "",
      description: "",

      publicationId: 0,
      title: "",
      date: "",
      authors: "",
    };

    this.onChange = this.onChange.bind(this);
    this.updateHeadlineAboutOnSubmit = this.updateHeadlineAboutOnSubmit.bind(this);
    this.addEducationOnSubmit = this.addEducationOnSubmit.bind(this);
    this.updateEducationOnSubmit = this.updateEducationOnSubmit.bind(this);
    this.deleteEducationOnSubmit = this.deleteEducationOnSubmit.bind(this);
    this.addPublicationOnSubmit = this.addPublicationOnSubmit.bind(this);
    this.updatePublicationOnSubmit = this.updatePublicationOnSubmit.bind(this);
    this.deletePublicationOnSubmit = this.deletePublicationOnSubmit.bind(this);
  }

  componentDidMount() {
    const { match, user } = this.props;
    this.props.getUserProfile(match.params.username, user.username);
    this.props.getAllEducations(match.params.username);
    this.props.getAllPublications(match.params.username);
    // this.props.getNumberOfPublications();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  updateHeadlineAbout(headline, about) {
    this.setState({ headline: headline, about: about });
  }

  updateHeadlineAboutOnSubmit(e) {
    e.preventDefault();
    this.props.updateUserProfile(this.state.headline, this.state.about, this.props.user.username);
  }

  addEducation() {
    this.setState({ institution: "", accreditation: "", startDate: "", endDate: "", description: "" });
  }

  addEducationOnSubmit(e) {
    e.preventDefault();

    this.props.createNewEducation(this.state.institution, this.state.accreditation,
      this.state.startDate, this.state.endDate, this.state.description, this.props.user.username);
  }

  updateEducation(educationId, institution, accreditation, startDate, endDate, description) {
    this.setState({ educationId: educationId, institution: institution, accreditation: accreditation, 
      startDate: startDate, endDate: endDate, description: description });
  }

  updateEducationOnSubmit(e) {
    e.preventDefault();

    this.props.updateEducation(this.state.educationId, this.state.institution, this.state.accreditation,
      this.state.startDate, this.state.endDate, this.state.description, this.props.user.username);
  }

  deleteEducation(educationId, institution, accreditation, startDate, endDate, description) {
    this.setState({ educationId: educationId, institution: institution, accreditation: accreditation, 
      startDate: startDate, endDate: endDate, description: description });
  }

  deleteEducationOnSubmit(e) {
    e.preventDefault();

    this.props.deleteEducation(this.state.educationId, this.props.user.username);
  }

  addPublication() {
    this.setState({ title: "", date: "", authors: "" });
  }

  addPublicationOnSubmit(e) {
    e.preventDefault();

    this.props.createNewPublication(this.state.title, this.state.date, this.state.authors,
      this.props.user.username);
  }

  updatePublication(publicationId, title, date, authors) {
    this.setState({ publicationId: publicationId, title: title, date: date, 
      authors: authors });
  }

  updatePublicationOnSubmit(e) {
    e.preventDefault();

    this.props.updatePublication(this.state.publicationId, this.state.title, 
      this.state.date, this.state.authors, this.props.user.username);
  }

  deletePublication(publicationId, title, date, authors) {
    this.setState({ publicationId: publicationId, title: title, 
      date: date, authors: authors });
  }

  deletePublicationOnSubmit(e) {
    e.preventDefault();

    this.props.deletePublication(this.state.publicationId, this.props.user.username);
  }

  render() {
    const { match, user, userProfile, educations, publications } = this.props;

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
          {/* <li className="nav-item" role="groups">
            <Link className="nav-link" to={'/ac/' + match.params.username + '/groups'} id="groups-tab" data-toggle="tab" role="tab" aria-controls="groups" aria-selected="false">
              Groups
            </Link>
          </li> */}
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
                    <a href="" onClick={() => this.addEducation()} className="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalAddEducationForm">
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
                              <button onClick={() => this.deleteEducation(education.id, education.institution, education.accreditation, education.startDate, education.endDate, education.description)} 
                                data-toggle="modal" data-target="#modalDeleteEducationForm">Delete</button>
                            </div>
                            <div style={{float: 'right', margin: '10px'}}>
                              <button onClick={() => this.updateEducation(education.id, education.institution, education.accreditation, education.startDate, education.endDate, education.description)} 
                                data-toggle="modal" data-target="#modalUpdateEducationForm">Update</button>
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
                    <a href="" onClick={() => this.addPublication()} className="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalAddPublicationForm">
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
                              <button data-toggle="modal" onClick={() => this.deletePublication(publication.id, publication.title, publication.date, publication.authors)} data-target="#modalDeletePublicationForm">Delete</button>
                            </div>
                            <div style={{float: 'right', margin: '10px'}}>
                              <button data-toggle="modal" onClick={() => this.updatePublication(publication.id, publication.title, publication.date, publication.authors)} data-target="#modalUpdatePublicationForm">Update</button>
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
              <form onSubmit={this.addEducationOnSubmit}>
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
                    <input type="text" id="defaultForm-institution" name="institution" onChange={this.onChange} value={this.state.institution} className="form-control validate" />
                  </div>
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-lock prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-accreditation">Accreditation</label>
                    <input type="text" id="defaultForm-accreditation" name="accreditation" onChange={this.onChange} value={this.state.accreditation} className="form-control validate" />
                  </div>
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-start-date">Start Date</label>
                    <input type="date" id="defaultForm-start-date" name="startDate" onChange={this.onChange} value={this.state.startDate} className="form-control validate"></input>
                  </div>
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-end-date">End Date</label>
                    <input type="date" id="defaultForm-end-date" name="endDate" onChange={this.onChange} value={this.state.endDate} className="form-control validate"></input>
                  </div>
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-description">Description</label>
                    <textarea id="defaultForm-description" name="description" onChange={this.onChange} value={this.state.description} className="form-control validate" style={{minHeight: '150px'}} />
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  {/* <button className="btn btn-default">Add Education</button> */}
                  <button type="submit" className="btn btn-default">Add Education</button>
                </div>
              </div>
              </form>
            </div>
          </div>

          {/* Update Education Modal */}

          <div className="modal fade" id="modalUpdateEducationForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
              <form onSubmit={this.updateEducationOnSubmit}>
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
                    <input type="text" id="defaultForm-institution" name="institution" onChange={this.onChange} value={this.state.institution} className="form-control validate" />
                  </div>
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-lock prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-accreditation">Accreditation</label>
                    <input type="text" id="defaultForm-accreditation" name="accreditation" onChange={this.onChange} value={this.state.accreditation} className="form-control validate" />
                  </div>
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-start-date">Start Date</label>
                    <input type="date" id="defaultForm-start-date" name="startDate" onChange={this.onChange} value={this.state.startDate} className="form-control validate"></input>
                  </div>
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-end-date">End Date</label>
                    <input type="date" id="defaultForm-end-date" name="endDate" onChange={this.onChange} value={this.state.endDate} className="form-control validate"></input>
                  </div>
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-description">Description</label>
                    <textarea id="defaultForm-description" name="description" onChange={this.onChange} value={this.state.description} className="form-control validate" style={{minHeight: '150px'}} />
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  {/* <button className="btn btn-default">Add Education</button> */}
                  <button type="submit" className="btn btn-default">Update</button>
                </div>
              </div>
              </form>
            </div>
          </div>

          {/* Delete Education Modal */}

          <div className="modal fade" id="modalDeleteEducationForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
              <form onSubmit={this.deleteEducationOnSubmit}>
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
                  {/* <button className="btn btn-default">Add Education</button> */}
                  <button type="submit" className="btn btn-danger">Delete</button>
                </div>
              </div>
              </form>
            </div>
          </div>

          {/* Add Publication Modal */}

          <div className="modal fade" id="modalAddPublicationForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
              <form onSubmit={this.addPublicationOnSubmit}>
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
                    <input type="text" id="defaultForm-title" name="title" onChange={this.onChange} value={this.state.title} className="form-control validate" />
                  </div>
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-publication-date">Publication Date</label>
                    <input type="date" id="defaultForm-publication-date" name="date" onChange={this.onChange} value={this.state.date} className="form-control validate"></input>
                  </div>
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-lock prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-authors">Authors</label>
                    <input type="text" id="defaultForm-authors" name="authors" onChange={this.onChange} value={this.state.authors} className="form-control validate" />
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  {/* <button className="btn btn-default">Add Education</button> */}
                  <button type="submit" className="btn btn-default">Add Publication</button>
                </div>
              </div>
              </form>
            </div>
          </div>

          {/* Update Publication Modal */}

          <div className="modal fade" id="modalUpdatePublicationForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
              <form onSubmit={this.updatePublicationOnSubmit}>
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
                    <input type="text" id="defaultForm-title" name="title" onChange={this.onChange} value={this.state.title} className="form-control validate" />
                  </div>
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-envelope prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-publication-date">Publication Date</label>
                    <input type="date" id="defaultForm-publication-date" name="date" onChange={this.onChange} value={this.state.date} className="form-control validate"></input>
                  </div>
                  <div className="md-form mb-5">
                    {/* <i className="fas fa-lock prefix grey-text"></i> */}
                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-authors">Authors</label>
                    <input type="text" id="defaultForm-authors" name="authors" onChange={this.onChange} value={this.state.authors} className="form-control validate" />
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  {/* <button className="btn btn-default">Add Education</button> */}
                  <button type="submit" className="btn btn-default">Update</button>
                </div>
              </div>
              </form>
            </div>
          </div>

          {/* Delete Publication Modal */}

          <div className="modal fade" id="modalDeletePublicationForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
              <form onSubmit={this.deletePublicationOnSubmit}>
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
                  {/* <button className="btn btn-default">Add Education</button> */}
                  <button type="submit" className="btn btn-danger">Delete</button>
                </div>
              </div>
              </form>
            </div>
          </div>
          
      </div>
    );
  }
}

const mapStateToProps = state => ({
  educations: state.educationReducer.educations,
  user: state.security.user,  
  userProfile: state.userProfileReducer.userProfile,
  publications: state.publicationReducer.publications,
});

export default connect(
  mapStateToProps,
  { 
    createNewEducation, getAllEducations,
    getAllPublications, getUserProfile, updateUserProfile, updateEducation,
    deleteEducation, createNewPublication, updatePublication, deletePublication,
  }
)(ProfileTab);