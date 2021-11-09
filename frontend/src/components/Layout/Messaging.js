import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Messaging extends Component {
  render() {
    return (
      <div className="messaging">
        <h1>Messaging Page</h1>
      </div>
    );
  }
}

Messaging.propTypes = {

};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(Messaging);