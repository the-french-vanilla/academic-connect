import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../../static/css/landing.css";

import frontV3 from '../../static/image/frontV3.png';

class Landing extends Component {
  
  render() {
    
    return (
      <div className="landing">
        <div className="wrapper">
                <div className="one">  
                    <img src={ frontV3 } alt="hello world" />
                </div>
            <div className="two">
                <h1><b>Academic Connect</b></h1>
                <h2><b>Connect with professors, researchers, and scholars in the academia.</b></h2>

                <form action="/action_page.php" method="post">
                    <label htmlFor="user"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="user" required />

                    <label htmlFor="passw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="passw" required />

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>

            {/* <main style={{backgroundColor: '#3D3D3D'}}>
                <div className="wrapper">
                <div className="one">  
                    <img src="../../static/image/frontV3.png" alt="" />
                </div>
                <div className="two">
                    <h1><b>Academic Connect</b></h1>
                    <h2><b>Connect with professors, researchers, and scholars in the academia.</b></h2>

                    <form action="/action_page.php" method="post">
                        <label htmlFor="user"><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" name="user" required />

                        <label htmlFor="passw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="passw" required />

                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
            </main> */}
        
        
      </div>
    );
  }
}

Landing.propTypes = {
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(mapStateToProps)(Landing);