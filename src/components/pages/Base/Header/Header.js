import React, {Component} from 'react';
import {connect} from 'react-redux'

import {Link, NavLink} from "react-router-dom";
import {userLogout} from "../../../../actions/authActions";
import history from './../../../../history';
import {showAlert, updateLocation} from "../../../../actions/uiActions";


class Header extends Component {

    componentWillMount() {

        this.props.updateLocation(history.location); //update for the first time on component mounting

        //listen for history changes and then update our current state properly
        this.unlisten = history.listen((location, action) => {

            //check for messages to display
            if (location.state !== undefined) {
                if(location.state.alert !== undefined) { //if there's an alert message coming from out history.push
                    this.props.showAlert('negative', 'Error', location.state.alert);
                }
            }

            //update current location (pathname) ==> useful for header dynamic change
            this.props.updateLocation(location);
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {

        switch (this.props.location.pathname) {

            case '/board':

                return (<React.Fragment>
                    <header className="board-header">
                        <div className="board-header-bar">

                            <NavLink className="board-header-logo" to="/">
                                <i className="fas fa-ellipsis-v mobile-menu"></i>
                            </NavLink>


                            <div className="board-selector">
                                <div className="board-selector-title">Main Goals</div>
                                <div className="hackachieve-dropdown-wrapper">
                                    <select name="board-dropdown" id="board-dropdown" className="hackachieve-dropdown">
                                        <option value="all">All</option>
                                    </select>
                                    <i className="dropdown-arrow fas fa-angle-down"></i>
                                </div>
                            </div>

                            <div className="board-switch">

                                <div className={`board-switch-item switch-active`}>
                                    <div className="board-switch-icon">
                                        <i className="fas fa-check"></i>

                                    </div>
                                    <div
                                        className="board-switch-text">
                                        ALL GOALS
                                    </div>

                                </div>

                                <div className={`board-switch-item`}>
                                    <div className="board-switch-icon">
                                        <i className="fas fa-check"></i>

                                    </div>
                                    <div className="board-switch-text">
                                        COMPLETED GOALS
                                    </div>
                                </div>
                            </div>

                            <div className="board-profile">

                                <div className="board-profile-username">
                                    John Snow
                                </div>

                                <div className="board-profile-user-picture">
                                    <img src="https://placehold.it/36/36" alt="user"/>
                                </div>
                            </div>
                        </div>
                    </header>
                </React.Fragment>);

            default:

                return (
                    <React.Fragment>

                        <div className="ui vertical inverted sidebar menu">

                            {/*{(User.isLoggedIn() ? <a className="active item" href="# ">Board</a> : null)}*/}

                            <a className="item" href="# ">Work</a>
                            <a className="item" href="# ">Company</a>
                            <a className="item" href="# ">Careers</a>
                            <a className="item" href="# ">Login</a>
                            <a className="item" href="# ">Signup</a>
                        </div>


                        <div className="header_menu">

                            <div className="ui container">
                                <div className="ui large secondary inverted pointing menu">
                                    <a className="toc item" href="# ">
                                        <i className="sidebar icon"></i>
                                    </a>

                                    <Link to={`/`} className="logo-link">
                                        <img src="images/logo_dark.png" alt="Logo" className="app-logo"/>
                                    </Link>
                                    <div className="right item">
                                        <Link className="item" to="/">Home</Link>
                                        {(this.props.isLoggedIn ?
                                            <Link className="item" to="/board">Board</Link> : null)}
                                        {(!this.props.isLoggedIn ?
                                            <React.Fragment>
                                                <Link id="btnLogin" to="/login" className="ui grey login button">Log
                                                    in</Link>
                                                <Link id="btnRegister" to="/register"
                                                      className="ui signup green button">Sign
                                                    Up</Link>
                                            </React.Fragment> :
                                            <button id="btnLogout" onClick={() => this.props.userLogout()}
                                                    className="ui inverted button">Logout</button>)}

                                    </div>
                                </div>
                            </div>
                        </div>

                    </React.Fragment>
                )


        }


    }


}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        location: state.ui.location
    };
};

export default connect(mapStateToProps, {
    //actions here
    userLogout,
    updateLocation,
    showAlert
})(Header);

