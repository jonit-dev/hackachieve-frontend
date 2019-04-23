import React, {Component} from 'react';
import history from './../history';
import {connect} from 'react-redux'
import {Route, Router, Switch} from "react-router-dom";
import './App.scss';

/* Pages =========================================== */
import Landing from './pages/Landing/Landing';
import Header from "./pages/Base/Header/Header";
import Login from "./pages/Landing/Login/Login";
import Register from "./pages/Landing/Register/Register";


class App extends Component {

    render() {
        return (
            <Router history={history}>
                <Header/>
                <Switch>
                    <Route path="/" exact component={Landing}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, {
    //actions here


})(App);

