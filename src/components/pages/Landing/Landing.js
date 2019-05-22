import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import User from '../../../classes/User';
import {Mixpanel} from '../../../mixpanel';

class Landing extends Component {

    componentDidMount() {
        Mixpanel.track('landing_visit');
    }

    render() {
        return (
            <React.Fragment>

                <div className="home_header">
                    <div className="heading">
                        <h1>
                            Hack Yourself
                        </h1>
                        <h2>Double your productivity using half of your time</h2>
                        {(User.isLoggedIn() ? <NavLink to="/board">Check my Goals</NavLink> :
                            <NavLink to="/register">Get Started</NavLink>)}
                    </div>
                </div>
                <div className="character_parent">
                    <div className="character">
                        <img src="images/character.png" alt=""/>
                    </div>
                </div>

                <div className="pusher">
                    <div className="ui vertical stripe segment">
                        <div className="ui middle aligned stackable grid container">
                            <div className="row">
                                <div className="sixteen wide column">
                                    <h3 className="ui center aligned header text-hackachieve-dark-purple ">
                                        YOUR GOALS AT YOUR FEET, YOUR HAND ACTUALLY</h3>
                                    <p className="text-grey">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                                        sed diam nonumy
                                        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                                        voluptua. At vero
                                        eos et accusam et justo duo dolores et ea rebum.</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="eight wide column mar-top-60 head-left">
                                    <div className="b-img"><img src="images/banana.png" alt=""/></div>
                                    <h3 className="ui aligned header text-hackachieve-dark-purple "> WE STILL MAKE
                                        BANANAS THAT CAN
                                        DANCE</h3>
                                    <p className="text-grey">Banana ipsum dolor sit amet, consetetur sadipscing elitr,
                                        sed diam
                                        nonumy<br/> banana tempor invidunt ut labore et dolore magna banana erat, sed
                                        diam<br/>
                                        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                                        Banana.</p>
                                </div>
                            </div>

                            <div className="row row-reverse">
                                <div className="eight wide column mar-top-60 head-right">
                                    <div className="b-img"><img src="images/banana.png" alt=""/></div>
                                    <h3 className="ui aligned header text-hackachieve-dark-purple "> MORE BANANAS CAME
                                        TO THE PARTY</h3>
                                    <p className="text-grey">Banana ipsum dolor sit amet, consetetur sadipscing elitr,
                                        sed diam
                                        nonumy<br/> banana tempor invidunt ut labore et dolore magna banana erat, sed
                                        diam<br/>
                                        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                                        Banana.</p>
                                </div>


                            </div>
                        </div>
                    </div>


                </div>

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, {
    //actions here
})(Landing);

