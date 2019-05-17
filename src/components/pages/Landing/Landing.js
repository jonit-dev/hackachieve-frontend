import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import User from '../../../classes/User';

class Landing extends Component {

    render() {
        return (
            <React.Fragment>

            <div className="home_header">
                <div className="heading">
                    <h1>
                        Hack Yourself
                    </h1>
                    <h2>Double your productivity using half of the time</h2>
                    {(User.isLoggedIn() ? <NavLink to="/board">Get Started</NavLink> :
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
                                <h3 className="ui center aligned header text-hackachieve-dark-purple ">We Help Companies and Companions</h3>
                                <p className="text-grey">We can give your company superpowers to do things that they never thought possible.
                                    Let us delight your customers and empower your needs...through pure data
                                    analytics.</p>
                            </div>
                            <div className="eight wide column mar-top-60">
                            <h3 className="ui aligned header text-hackachieve-dark-purple ">We Make Bananas That Can Dance</h3>
                                <p className="text-grey">Yes that's right, you thought it was the stuff of dreams, but even bananas can be
                                    bioengineered.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="center aligned column">
                                <a className="ui huge button" href="# ">Check Them Out</a>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="ui vertical stripe quote segment">
                    <div className="ui equal width stackable internally celled grid">
                        <div className="center aligned row">
                            <div className="column">
                                <h3 className="text-hackachieve-dark-purple">"What a Company"</h3>
                                <p className="text-grey">That is what they all say about us</p>
                            </div>
                            <div className="column">
                                <h3 className="text-hackachieve-dark-purple">"I shouldn't have gone with their competitor."</h3>
                                <p className="text-grey">
                                    <b>Nan</b> Chief Fun Officer Acme Toys
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ui vertical stripe segment">
                    <div className="ui text container">
                        <h3 className="ui header text-hackachieve-dark-purple">Breaking The Grid, Grabs Your Attention</h3>
                        <p className="text-grey">Instead of focusing on content creation and hard work, we have learned how to master the art
                            of doing nothing by providing massive amounts of whitespace and generic content that can
                            seem massive, monolithic and worth your attention.</p>
                        <a className="ui large button" href="# ">Read More</a>
                        <h4 className="ui horizontal header divider">
                            <a href="# ">Case Studies</a>
                        </h4>
                        <h3 className="ui header text-hackachieve-dark-purple">Did We Tell You About Our Bananas?</h3>
                        <p className="text-grey">Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
                            its really true. It took years of gene splicing and combinatory DNA research, but our
                            bananas can really dance.</p>
                        <a className="ui large button" href="# ">I'm Still Quite Interested</a>
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

