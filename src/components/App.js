import React, { Component } from "react";
import history from "./../history";
import { connect } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import "./App.scss";

/* Pages =========================================== */
import Landing from "./pages/Landing/Landing";
import Header from "./pages/Base/Header/Header";
import Login from "./pages/Landing/Login/Login";
import Register from "./pages/Landing/Register/Register";
import { checkLoggedIn } from "../actions/authActions";
import Board from "./pages/Board/Board";
import env from "../env";
import TermsOfUse from "./pages/Landing/Legal/TermsOfUse";
import PrivacyPolicy from "./pages/Landing/Legal/PrivacyPolicy";
import Footer from "./pages/Base/Footer/Footer";
import Preferences from "./pages/Landing/Preferences/Preferences";
import FullStory from "react-fullstory";
import NotFound from "./pages/Base/NotFound/NotFound";
import ScrollToTop from "./pages/Base/Routing/ScrollToTop";
import FAQ from "./pages/Landing/FAQ/FAQ";
import AboutUs from "./pages/Landing/AboutUs/AboutUs";
import Project from "./pages/Project/Project";

let isProd = env.env === "prod";

class App extends Component {
  componentDidMount() {
    this.props.checkLoggedIn(); //check logged in on app init

    console.log(`Initializing app. Environment is ${env.env}`);

    //Necessary for GTM
    window.dataLayer = window.dataLayer || [];
  }

  render() {
    return (
      <Router history={history}>
        <ScrollToTop>
          {isProd ? <FullStory org="MJK6R" /> : null}
          <Header />

          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/faq" component={FAQ} />
            <Route path="/about-us" component={AboutUs} />
            <Route path="/register" component={Register} />
            <Route path="/terms" component={TermsOfUse} />
            <Route path="/privacy" component={PrivacyPolicy} />

            <Route path="/project/:projectId/board" component={Board} />
            <Route path="/board" component={Board} />

            <Route path="/projects" component={Project} />
            <Route path="/preferences" component={Preferences} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </ScrollToTop>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default connect(
  mapStateToProps,
  {
    //actions here
    checkLoggedIn
  }
)(App);
