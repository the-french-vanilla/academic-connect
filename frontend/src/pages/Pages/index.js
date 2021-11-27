import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import SecuredRoute from "../../securityUtils/SecureRoute";
import AllPagesTab from "./AllPagesTab";
import DiscoverPagesTab from "./DiscoverPagesTab";

class Pages extends Component {
  render() {
    const {match} = this.props;

    return (
      <div className="pages">
        <div style={{height: '10vh'}}></div>

        <h1 className="h3 mb-3">Pages</h1>

        <div className="container">
          <div className="row ">
            <div className="col-9"></div>
            <div className="col-3 float-right">
              <div className="text-center">
                <a href="" className="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalLoginForm">
                  Create Page
                </a>
              </div>
            </div>
          </div>
        </div>

        <Switch>
          <SecuredRoute exact path={match.path + "/"} component={AllPagesTab} />
          <SecuredRoute exact path={match.path + "/discover"} component={DiscoverPagesTab} />
        </Switch>

        <div className="modal fade" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
          aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">Create Page</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body mx-3">
                <div className="md-form mb-5">
                  <label data-error="wrong" data-success="right" htmlFor="defaultForm-name">Page Name</label>
                  <input type="text" id="defaultForm-name" className="form-control validate" />
                </div>
                <div className="md-form mb-5">
                  <label data-error="wrong" data-success="right" htmlFor="defaultForm-description">Description</label>
                  <textarea type="text" id="defaultForm-description" className="form-control validate" />
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button className="btn btn-default">Create Page</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

Pages.propTypes = {

};

const mapStateToProps = state => ({
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
  mapStateToProps
)(Pages);