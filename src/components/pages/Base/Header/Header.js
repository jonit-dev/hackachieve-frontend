import React, { Component } from "react";
import { connect } from "react-redux";

import { Link, NavLink } from "react-router-dom";
import { userInfoRefresh, userLogout } from "../../../../actions/authActions";
import {
  loadUserGoalsCategories,
  filterGoals
} from "../../../../actions/goalsActions";
import history from "./../../../../history";
import {
  showAlert,
  updateLocation,
  changeSelectedPanel
} from "../../../../actions/uiActions";
import { changeBoardShowGoal } from "../../../../actions/boardActions";
import { loadGoals } from "../../../../actions/goalsActions";

import UserMenu from "./UserMenu";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMenuOpen: false,
      currentPanel: "board"
    };
  }

  componentDidMount() {
    console.log("refreshing user info");

    if (this.props.location.pathname === "/board") {
      this.props.userInfoRefresh();
    }
  }

  componentWillMount() {
    if (this.props.location.pathname === "/board") {
      this.props.loadUserGoalsCategories(this.props.currentProjectId);
    }

    this.props.updateLocation(history.location); //update for the first time on component mounting

    //listen for history changes and then update our current state properly
    this.unlisten = history.listen((location, action) => {
      //check for messages to display
      if (location.state !== undefined) {
        if (location.state.alert !== undefined) {
          //if there's an alert message coming from out history.push
          this.props.showAlert("negative", "Error", location.state.alert);
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
    if (type === this.state.currentPanel) {
      return "board-switch-item switch-active";
    } else {
      return "board-switch-item";
    }
  }

  onBoardSwitch(panel) {
    this.props.changeSelectedPanel(panel);

    this.setState({
      currentPanel: panel
    });

    // this.props.changeBoardShowGoal(type).then(() => {
    //   this.props.loadGoals(
    //     this.props.currentProjectId,
    //     this.props.boardShowGoals
    //   );
    // });
  }

  onOpenMenuClick() {
    this.setState({
      userMenuOpen: !this.state.userMenuOpen
    });
  }

  handleFilter = e => {
    this.props.filterGoals(e.target.value);
  };

  render() {
    let { boardCategories } = this.props;

    if (this.props.location.pathname.includes("/board")) {
      return (
        <React.Fragment>
          <header className="board-header">
            <div className="board-header-bar">
              <NavLink
                to="/"
                aria-current="page"
                className="board-header-logo active"
              >
                <i className="fas fa-ellipsis-v mobile-menu" />
              </NavLink>
              <div className="board-selector">
                <div className="board-selector-title">Main Goals</div>
                <div className="hackachieve-dropdown-wrapper">
                  <select
                    name="goalFilter"
                    id="board-dropdown"
                    className="hackachieve-dropdown"
                    onChange={this.handleFilter}
                  >
                    <option value="All">All Goals</option>
                    <option value="week" key="week">
                      Week
                    </option>
                    {boardCategories &&
                      boardCategories.map((goalCategory, index) => {
                        return (
                          <option value={goalCategory.name} key={index}>
                            {goalCategory.name}
                          </option>
                        );
                      })}
                  </select>
                  <i className="dropdown-arrow fas fa-angle-down"></i>
                </div>
              </div>
              <div className="board-switch">
                <div
                  className={this.onHandleBoardSwitchItem("board")}
                  onClick={() => this.onBoardSwitch("board")}
                >
                  <div className="board-switch-icon"></div>
                  <div className="board-switch-text">Board</div>
                </div>

                {/* <div
                  className={this.onHandleBoardSwitchItem("tasks")}
                  onClick={() => this.onBoardSwitch("tasks")}
                >
                  <div className="board-switch-icon"></div>
                  <div className="board-switch-text">Tasks</div>
                </div> */}

                <div
                  className={this.onHandleBoardSwitchItem("projects")}
                  onClick={() => this.onBoardSwitch("projects")}
                >
                  <div className="board-switch-icon"></div>
                  <div className="board-switch-text">Projects</div>
                </div>

                {/* <div
                  className={this.onHandleBoardSwitchItem("all")}
                  onClick={() => this.onBoardSwitch("all")}
                >
                  <div className="board-switch-icon"></div>
                  <div className="board-switch-text">ALL</div>
                </div>
                <div
                  className={this.onHandleBoardSwitchItem("standby")}
                  onClick={() => this.onBoardSwitch("standby")}
                >
                  <div className="board-switch-icon"></div>
                  <div className="board-switch-text">PENDING</div>
                </div>
                <div
                  className={this.onHandleBoardSwitchItem("ongoing")}
                  onClick={() => this.onBoardSwitch("ongoing")}
                >
                  <div className="board-switch-icon"></div>
                  <div className="board-switch-text">ON GOING</div>
                </div>
                <div
                  className={this.onHandleBoardSwitchItem("completed")}
                  onClick={() => this.onBoardSwitch("completed")}
                >
                  <div className="board-switch-icon"></div>
                  <div className="board-switch-text">COMPLETED</div>
                </div> */}
              </div>
              <div
                className="board-profile"
                onClick={() => this.onOpenMenuClick()}
              >
                <div className="board-profile-username">
                  {this.props.userInfo.firstName}
                </div>
                <div className="board-profile-user-picture">
                  <img
                    src="/images/icons/avatar-generic.svg"
                    alt="user avatar"
                  />
                  {this.state.userMenuOpen && <UserMenu />}
                </div>
              </div>
            </div>
          </header>
        </React.Fragment>
      );
    } else if (this.props.location.pathname.includes("/projects")) {
      return (
        <React.Fragment>
          <header className="board-header">
            <div className="board-header-bar">
              <NavLink
                to="/"
                aria-current="page"
                className="board-header-logo active"
              >
                <i className="fas fa-ellipsis-v mobile-menu" />
              </NavLink>
              <div className="board-selector">
                <div className="header-title">Projects</div>
              </div>
              <div className="board-switch"></div>
              <div
                className="board-profile"
                onClick={() => this.onOpenMenuClick()}
              >
                <div className="board-profile-username">
                  {this.props.userInfo.firstName}
                </div>
                <div className="board-profile-user-picture">
                  <img
                    src="/images/icons/avatar-generic.svg"
                    alt="user avatar"
                  />
                  {this.state.userMenuOpen && <UserMenu />}
                </div>
              </div>
            </div>
          </header>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="site-mobile-menu site-navbar-target">
            <div className="site-mobile-menu-header">
              <div className="site-mobile-menu-close mt-3">
                <span className="icon-close2 js-menu-toggle" />
              </div>
            </div>
            <div className="site-mobile-menu-body">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </div>
          </div>
          <header
            className="site-navbar py-md-4 js-sticky-header site-navbar-target"
            role="banner"
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-12 col-md-3">
                  <h1 className="mb-0 site-logo">
                    <Link to={"/"} className="text-black h2 mb-0">
                      <img
                        src="landing_resources/images/hackachieve-logo-vertical.svg"
                        alt="hackachieve logo"
                      />
                    </Link>
                  </h1>
                </div>
                <div className="col-12 col-md-9">
                  <a
                    href="# "
                    className="site-menu-toggle js-menu-toggle text-black float-right d-lg-none"
                  >
                    <span className="icon-menu h3" />
                  </a>
                  <div className="button-main">
                    {this.props.isLoggedIn ? (
                      <Link className="ui inverted button" to="/projects">
                        Projects
                      </Link>
                    ) : null}

                    {!this.props.isLoggedIn ? (
                      <React.Fragment>
                        <Link
                          id="btnLogin"
                          to="/login"
                          className="ui inverted button"
                        >
                          Log in
                        </Link>
                        <Link
                          id="btnsignup"
                          to="/register"
                          className="ui inverted button"
                        >
                          Sign Up
                        </Link>
                      </React.Fragment>
                    ) : (
                      <button
                        id="btnLogout"
                        onClick={() => this.props.userLogout()}
                        className="ui inverted button"
                      >
                        Logout
                      </button>
                    )}

                    {/* <a id="btnLogin" href="# ">Log in</a> */}
                    {/* <a id="btnsignup" href="# ">Sign Up</a> */}
                  </div>
                  <div className="main-menu">
                    <nav
                      className="site-navigation position-relative text-right"
                      role="navigation"
                    >
                      <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                        <li>
                          <Link to="/" className="nav-link">
                            Home
                          </Link>
                          <Link to="/faq" className="nav-link">
                            FAQ
                          </Link>
                          <Link to="/about-us" className="nav-link">
                            About Us
                          </Link>
                          <Link to="/register" className="nav-link">
                            Register
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = state => {
  const { boardShowGoals, location, boardCategories } = state.ui;

  return {
    userInfo: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
    location: location,
    boardShowGoals: boardShowGoals,
    boardCategories: boardCategories,
    currentProjectId: state.projects.currentProjectId
  };
};

export default connect(
  mapStateToProps,
  {
    //actions here
    userLogout,
    updateLocation,
    showAlert,
    changeBoardShowGoal,
    loadGoals,
    loadUserGoalsCategories,
    filterGoals,
    userInfoRefresh,
    changeSelectedPanel
  }
)(Header);
