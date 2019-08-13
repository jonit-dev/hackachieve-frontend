import React from "react";
import { Link, withRouter } from "react-router-dom";

const Footer = props => {
  switch (props.location.pathname) {
    // case '/board':
    //
    //     return null;

    default:
      return (
        <React.Fragment>
          <div className="footer py-5 border-top text-center">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <ul className="social-icons">
                    <li>
                      <a
                        href="https://www.facebook.com/hackachieve/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/hackachieve.oficial/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <p className="mb-0">
                    <Link to="/terms" className="p-3 footer-item">
                      Terms Of Use
                    </Link>

                    <Link to="/privacy" className="p-3 footer-item">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
  }
};

export default withRouter(Footer);
