import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Messaging extends Component {
  render() {
    return (
      <div className="messaging">
        <div id="container">
          <aside>
            <header>
              <input type="text" placeholder="search" />
            </header>
            <ul>
              <li>
                <img src="#" alt="" />
                <div>
                  <h2>Liang Chen</h2>
                  <h3>
                    <span className="status orange"></span>
                    offline
                  </h3>
                </div>
              </li>
              <li>
                <img src="#" alt="" />
                <div>
                  <h2>David Casperson</h2>
                  <h3>
                    <span className="status green"></span>
                    online
                  </h3>
                </div>
              </li>
              <li>
                <img src="#" alt="" />
                <div>
                  <h2>.Net Users</h2>
                  <h3>
                    <span className="status orange"></span>
                    offline
                  </h3>
                </div>
              </li>
            </ul>
          </aside>
          <main>
            <header>
              <img src="#" alt="" />
              <div>
                <h2>David Casperson</h2>
              </div>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png" alt="" />
            </header>
            <ul id="chat">
              <li className="you">
                <div className="entete">
                  <span className="status green"></span>
                  <h2>Vincent</h2>
                  <h3>10:12AM, Today</h3>
                </div>
                <div className="triangle"></div>
                <div className="message">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                </div>
              </li>
              <li className="me">
                <div className="entete">
                  <h3>10:12AM, Today</h3>
                  <h2>Vincent</h2>
                  <span className="status blue"></span>
                </div>
                <div className="triangle"></div>
                <div className="message">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                </div>
              </li>
              <li className="me">
                <div className="entete">
                  <h3>10:12AM, Today</h3>
                  <h2>Vincent</h2>
                  <span className="status blue"></span>
                </div>
                <div className="triangle"></div>
                <div className="message">
                  OK
                </div>
              </li>
              <li className="you">
                <div className="entete">
                  <span className="status green"></span>
                  <h2>Vincent</h2>
                  <h3>10:12AM, Today</h3>
                </div>
                <div className="triangle"></div>
                <div className="message">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                </div>
              </li>
              <li className="me">
                <div className="entete">
                  <h3>10:12AM, Today</h3>
                  <h2>Vincent</h2>
                  <span className="status blue"></span>
                </div>
                <div className="triangle"></div>
                <div className="message">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                </div>
              </li>
              <li className="me">
                <div className="entete">
                  <h3>10:12AM, Today</h3>
                  <h2>Vincent</h2>
                  <span className="status blue"></span>
                </div>
                <div className="triangle"></div>
                <div className="message">
                  OK
                </div>
              </li>
            </ul>
            <footer>
              <textarea placeholder="Type your message"></textarea>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png" alt="" />
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png" alt="" />
              <a href="#">Send</a>
            </footer>
          </main>
        </div>
      </div>
    );
  }
}

Messaging.propTypes = {

};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(Messaging);