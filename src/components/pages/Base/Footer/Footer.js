import React from 'react';
import {withRouter} from "react-router-dom";

const Footer = (props) => {

    switch (props.location.pathname) {

        case '/board':

            return null;


        default:
            return (
                <React.Fragment>
                    <div className="ui inverted vertical footer segment">
                        <div className="ui container">
                            <div className="ui stackable inverted divided equal height stackable grid">
                                <div className="three wide column">
                                    <h4 className="ui inverted header">About</h4>
                                    <div className="ui inverted link list">
                                        <a href="# " className="item">Sitemap</a>
                                        <a href="# " className="item">Contact Us</a>
                                        <a href="# " className="item">Religious Ceremonies</a>
                                        <a href="# " className="item">Gazebo Plans</a>
                                    </div>
                                </div>
                                <div className="three wide column">
                                    <h4 className="ui inverted header">Services</h4>
                                    <div className="ui inverted link list">
                                        <a href="# " className="item">Banana Pre-Order</a>
                                        <a href="# " className="item">DNA FAQ</a>
                                        <a href="# " className="item">How To Access</a>
                                        <a href="# " className="item">Favorite X-Men</a>
                                    </div>
                                </div>
                                <div className="seven wide column">
                                    <h4 className="ui inverted header">Footer Header</h4>
                                    <p>Extra space for a call to action inside the footer that could help re-engage
                                        users.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )


    }


};

export default withRouter(Footer);