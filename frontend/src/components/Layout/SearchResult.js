import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class SearchResult extends Component {
  render() {
    return (
      <div className="search-result">
        <div style={{height: '10vh'}}></div>

        <h3>People</h3>

        <div className="container">
          <div className="row">
            <div className="col-8">
              <div  className="card">
                <div className="create_input d_flex">
                  <div className="profile_thumb rounded-img">
                    <img src="/Users/deeppatel/Desktop/terry.jpeg" alt="" height="20" width="20" />
                  </div>
                  <div style={{float: 'right'}}>
                    <h4>John Doe</h4>
                    <h6>January 1</h6>
                  </div>
                  <div>
                  <p>Hello world</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4"></div>
          </div>
        </div>

        <h3>Groups</h3>

        <div className="container">
          <div className="row">
            <div className="col-8">
              <div  className="card">
                <div className="create_input d_flex">
                  <div className="profile_thumb rounded-img">
                    <img src="/Users/deeppatel/Desktop/terry.jpeg" alt="" height="20" width="20" />
                  </div>
                  <div style={{float: 'right'}}>
                    <h4>John Doe</h4>
                    <h6>January 1</h6>
                  </div>
                  <div>
                  <p>Hello world</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4"></div>
          </div>
        </div>
        
      </div>
    );
  }
}

SearchResult.propTypes = {

};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(SearchResult);