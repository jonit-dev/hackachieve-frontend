import React, {Component} from 'react';
import {connect} from 'react-redux'

import {Link} from "react-router-dom";
import {userLogout} from "../../../../actions/authActions";


class Header extends Component {

    render() {
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
                                    </React.Fragment> : <button id="btnLogout" onClick={() => this.props.userLogout()}
                                                                className="ui inverted button">Logout</button>)}

                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )


    }


}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
};

export default connect(mapStateToProps, {
    //actions here
    userLogout
})(Header);

