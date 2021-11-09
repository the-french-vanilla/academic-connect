import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Feed extends Component {
  render() {
    return (
      <div className="feeds">
        <h1>Feed Page</h1>
      </div>
    );
  }
}

Feed.propTypes = {

};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(Feed);