import React, {Component} from 'react';
import {connect} from 'react-redux'

import {Link, NavLink} from "react-router-dom";
import {userInfoRefresh, userLogout} from "../../../../actions/authActions";
import {loadUserGoalsCategories, filterGoals} from "../../../../actions/goalsActions";
import history from './../../../../history';
import {showAlert, updateLocation} from "../../../../actions/uiActions";
import {changeBoardShowGoal} from "../../../../actions/boardActions";
import {loadGoals} from "../../../../actions/goalsActions";

import UserMenu from "./UserMenu"


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userMenuOpen: false
        }
    }

    componentDidMount() {
        console.log('refreshing user info');
        this.props.userInfoRefresh();

    }

    componentWillMount() {
        this.props.loadUserGoalsCategories();
        this.props.updateLocation(history.location); //update for the first time on component mounting

        //listen for history changes and then update our current state properly
        this.unlisten = history.listen((location, action) => {

            //check for messages to display
            if (location.state !== undefined) {
                if (location.state.alert !== undefined) { //if there's an alert message coming from out history.push
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


    onHandleBoardSwitchItem(type) {

        if (type === this.props.boardShowGoals) {
            return 'board-switch-item switch-active';
        } else {

            return 'board-switch-item';
        }
    }

    onBoardSwitch(type) {

        this.props.changeBoardShowGoal(type).then(() => {
            this.props.loadGoals(0, this.props.boardShowGoals)
        });

    }

    onOpenMenuClick() {
        this.setState({
            userMenuOpen: !this.state.userMenuOpen
        })

        console.log(this.state.userMenuOpen);

    }

    handleFilter = (e) => {
        this.props.filterGoals(e.target.value);
    }

    render() {
        let {boardCategories} = this.props
        switch (this.props.location.pathname) {

            case '/board':

                return (<React.Fragment>
                    <header className="board-header">
                        <div className="board-header-bar"><NavLink to='/' aria-current="page"
                                                                   className="board-header-logo active"><i
                            className="fas fa-ellipsis-v mobile-menu"/></NavLink>
                            <div className="board-selector">
                                <div className="board-selector-title">Main Goals</div>
                                <div className="hackachieve-dropdown-wrapper">
                                    <select name="goalFilter" id="board-dropdown" className="hackachieve-dropdown"
                                            onChange={this.handleFilter}>
                                        <option value="All">All</option>
                                        {boardCategories && boardCategories.map((goalCategory, index) => {
                                            return <option value={goalCategory.name}
                                                           key={index}>{goalCategory.name}</option>
                                        })}
                                        <option value="week" key="week">Week</option>
                                    </select>
                                    <i className="dropdown-arrow fas fa-angle-down"></i>
                                </div>
                            </div>
                            <div className="board-switch">
                                <div className={this.onHandleBoardSwitchItem('all')}
                                     onClick={() => this.onBoardSwitch('all')}
                                >
                                    <div className="board-switch-icon"></div>
                                    <div className="board-switch-text">ALL</div>
                                </div>
                                <div className={this.onHandleBoardSwitchItem('standby')}
                                     onClick={() => this.onBoardSwitch('standby')}>
                                    <div className="board-switch-icon"></div>
                                    <div className="board-switch-text">PENDING</div>
                                </div>
                                <div className={this.onHandleBoardSwitchItem('ongoing')}
                                     onClick={() => this.onBoardSwitch('ongoing')}>
                                    <div className="board-switch-icon"></div>
                                    <div className="board-switch-text">ON GOING</div>
                                </div>
                                <div className={this.onHandleBoardSwitchItem('completed')}
                                     onClick={() => this.onBoardSwitch('completed')}>
                                    <div className="board-switch-icon"></div>
                                    <div className="board-switch-text">COMPLETED</div>
                                </div>
                            </div>
                            <div className="board-profile" onClick={() => this.onOpenMenuClick()}>
                                <div className="board-profile-username">{this.props.userInfo.firstName}</div>
                                <div className="board-profile-user-picture"><img src="./images/icons/avatar-generic.svg"
                                                                                 alt="user"/>
                                    {this.state.userMenuOpen && <UserMenu/>}

                                </div>
                            </div>
                        </div>
                    </header>
                </React.Fragment>);

            default:

                return (
                    <React.Fragment>

                        <div className="header_menu">
                            <div className="ui container">
                                <div className="ui large secondary inverted pointing menu">
                                    <a href=" #" className="mobile-menu" onClick={() => this.onOpenMenuClick()}>
                                        <i className="sidebar icon"/>
                                    </a>
                                    <Link to={`/`} className="logo-link">
                                        <img src="/images/logo_dark.png" alt="Logo" className="app-logo"/>
                                    </Link>

                                    <div className="right-items">
                                        <div className="button-main">

                                            {(this.props.isLoggedIn ?
                                                <Link className="ui inverted button" to="/board">Board</Link> : null)}

                                            {(!this.props.isLoggedIn ?
                                                <React.Fragment>
                                                    <Link id="btnLogin" to="/login" className="ui inverted button">
                                                        Log in
                                                    </Link>
                                                    <Link id="btnsignup" to="/register"
                                                          className="ui inverted button">Sign
                                                        Up</Link>
                                                </React.Fragment> :
                                                <button id="btnLogout" onClick={() => this.props.userLogout()}
                                                        className="ui inverted button">Logout</button>)}

                                        </div>


                                        <div className="navigation" id="mySidenav"
                                             style={(this.state.userMenuOpen ? {'width': '100%'} : null)}>
                                            <a href="# " className="closebtn"
                                               onClick={() => this.onOpenMenuClick()}>&times;</a>
                                            <ul className="nav-sub-menu">
                                                <li><Link className="active" to='/'>Home</Link></li>
                                                <li><Link to='/terms'>Terms</Link></li>
                                                <li><Link to="/privacy">Privacy</Link></li>

                                            </ul>
                                        </div>
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

    const {boardShowGoals, location, boardCategories} = state.ui;

    return {
        userInfo: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn,
        location: location,
        boardShowGoals: boardShowGoals,
        boardCategories
    };
};

export default connect(mapStateToProps, {
    //actions here
    userLogout,
    updateLocation,
    showAlert,
    changeBoardShowGoal,
    loadGoals,
    loadUserGoalsCategories,
    filterGoals,
    userInfoRefresh
})(Header);

