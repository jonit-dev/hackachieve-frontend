import React, {Component} from 'react';
import {NavLink, withRouter} from "react-router-dom";
import User from '../../../../classes/User'


class Header extends Component {

    state = {
        allGoalsClass: 'board-switch-item switch-active',
        completedGoalsClass: 'board-switch-item'
    };

    handleClick = (url) => {

        this.props.update_board_api_endpoint(url);

        if (url.includes('all')) {
            this.setState({
                allGoalsClass: 'board-switch-item switch-active',
                completedGoalsClass: 'board-switch-item',
            });
        } else if (url.includes('done')) {
            this.setState({
                allGoalsClass: 'board-switch-item',
                completedGoalsClass: 'board-switch-item switch-active',
            });
        }
    };

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

                                <div className={this.state.allGoalsClass}>
                                    <div className="board-switch-icon">
                                        <i className="fas fa-check"></i>

                                    </div>
                                    <div onClick={() => this.handleClick('/boards/show/0/all')}
                                         className="board-switch-text">
                                        ALL GOALS
                                    </div>

                                </div>

                                <div className={this.state.completedGoalsClass}>
                                    <div className="board-switch-icon">
                                        <i className="fas fa-check"></i>

                                    </div>
                                    <div onClick={() => this.handleClick('/boards/show/0/done')}
                                         className="board-switch-text">
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

                        <div className="ui large top fixed hidden menu">
                            <div className="ui container">
                                <a className="item" href="# ">Home</a>
                                <a className="item" href="# ">Work</a>
                                <a className="item" href="# ">Company</a>
                                <a className="item" href="# ">Careers</a>
                                <div className="right menu">
                                    <div className="item">
                                        <a className="ui button" href="# ">Log in</a>
                                    </div>
                                    <div className="item">
                                        <a className="ui primary button" href="# ">Sign Up</a>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="ui vertical inverted sidebar menu">

                            {(User.isLoggedIn() ? <a className="active item" href="# ">Board</a> : null)}

                            {/*<a className="item" href="# ">Work</a>*/}
                            {/*<a className="item" href="# ">Company</a>*/}
                            {/*<a className="item" href="# ">Careers</a>*/}
                            {/*<a className="item" href="# ">Login</a>*/}
                            {/*<a className="item" href="# ">Signup</a>*/}
                        </div>


                        <div className="header_menu">

                            <div className="ui container">
                                <div className="menu_conatiner ui large secondary inverted pointing menu">
                                    <a className="toc item" href="# ">
                                        <i className="sidebar icon"></i>
                                    </a>

                                    <img src="images/logo_dark.png" alt="Logo"/>

                                    {/*<a className="item" href="# ">Work</a>*/}
                                    {/*<a className="item" href="# ">Company</a>*/}
                                    {/*<a className="item" href="# ">Careers</a>*/}
                                    {/*<a className="item" href="# ">Login</a>*/}
                                    {/*<a className="item" href="# ">Signup</a>*/}
                                    <div className="right item">
                                        <NavLink className="item" to="/">Home</NavLink>
                                        {(User.isLoggedIn() ?
                                            <NavLink className="item" to="/board">Board</NavLink> : null)}
                                        {(!User.isLoggedIn() ?
                                            <React.Fragment>
                                                <NavLink id="btnLogin" to="/login" className="ui grey login button">Log
                                                    in</NavLink>
                                                <NavLink id="btnRegister" to="/register"
                                                         className="ui signup green button">Sign
                                                    Up</NavLink>
                                            </React.Fragment> : <button id="btnLogout" onClick={User.logout}
                                                                        className="ui inverted button">Logout</button>)}

                                    </div>
                                </div>
                            </div>
                        </div>

                    </React.Fragment>
                );


        }


    }
}

export default withRouter(Header);