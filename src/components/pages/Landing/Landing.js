import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import User from '../../../classes/User';
import Analytics from "../../../analytics/Analytics";

class Landing extends Component {

    componentDidMount() {


        Analytics.track('landing_visit', {
            'eventCategory': 'pages',
            'eventAction': 'landing_visit',
        })

    }

    render() {
        console.log(User.isLoggedIn(),'User.isLoggedIn()');
        return (
            <React.Fragment>

                <div className="home_header">
                    <div className="heading">
                        <h1>
                            Hack Yourself
                        </h1>
                        <h2>Double your productivity using half of your time!</h2>
                        {(User.isLoggedIn() ? <NavLink to="/board">Access Your Goals</NavLink> :
                            <NavLink to="/register">Get Started</NavLink>)}
                    </div>
                </div>
                <div className="character_parent">
                    <div className="character">
                        <img src="/images/character.png" alt=""/>
                    </div>
                </div>

                <div className="pusher">
                    <div className="ui vertical stripe segment">
                        <div className="ui middle aligned stackable grid container">
                            <div className="row">
                                <div className="sixteen wide column">
                                    <h3 className="ui center aligned header text-hackachieve-dark-purple ">
                                        TAKE ABSOLUTE CONTROL OF YOUR LIFE</h3>
                                    <p className="text-grey">

                                        Are you tired of procrastinating your future and not having any clue of where
                                        are you going to in your life?
                                        <br/>
                                        Hackachieve helps you connecting the dots by setting a productivity framework
                                        for you! You'll be able to set both <strong>long term</strong> and <strong>short
                                        term</strong> goals, prioritize by impact and categorize everything into an
                                        organized environment!
                                        <br/><br/>
                                        What are you waiting for? <br/><br/> <NavLink to="/register">Create your free
                                        account</NavLink> right now and enjoy our exclusive methodology!</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="eight wide column mar-top-60 head-left">
                                    <div className="b-img">
                                        <i className="far fa-star landing-icon"></i></div>
                                    <h3 className="ui aligned header text-hackachieve-dark-purple "> PRIORITIZE WHAT
                                        MATTERS</h3>
                                    <p className="text-grey">

                                        Its very common to lose yourself trying to plan a pathway to a particular long
                                        term goal. Prioritizing helps you to define what's more important to the present
                                        moment in your life, so you can accomplish your short term goals one step at a
                                        time.</p>
                                </div>
                            </div>

                            <div className="row row-reverse">
                                <div className="eight wide column mar-top-60 head-right">
                                    <div className="b-img">
                                        <i className="fas fa-columns landing-icon"></i>
                                    </div>
                                    <h3 className="ui aligned header text-hackachieve-dark-purple "> ORGANIZE
                                        YOURSELF</h3>
                                    <p className="text-grey">

                                        In almost every productivity app you end up getting lost after some time, since
                                        there's a ton of things to do without any contextual organization.

                                        <br/>
                                        In Hackachieve, we split your long term goals in different categories (health,
                                        finances, etc) and each one of them will have its related cards. You can also
                                        filter out categories from your board view
                                    </p>
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

