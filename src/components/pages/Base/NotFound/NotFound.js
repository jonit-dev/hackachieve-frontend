import React from "react";

import {Link} from "react-router-dom";
const NotFound = props => {
  return (
    <div className="home_header internal_header">
      <a className="mobile-logo" href="# ">
        <img src="/images/board/hackachieve-symbol.svg" alt="Logo" />
      </a>
      <div className="site-wrap internal-page internal-sec">
        <h3>Sorry, Page Not Found</h3>
        <div className="internal-inner">
          <div className="internal-inner">
            <p>The page you're looking for does not exist.</p>

            <p>
              <Link to="/">Back to Home</Link>
            </p>

            <div className="clear"></div>
          </div>

          <hr />

          {/* <h5 className="padding">You don’t need to decorate new passwords if you don’t want to,</h5> */}
        </div>
      </div>
      <div className="clear"></div>
    </div>
  );
};

export default NotFound;
