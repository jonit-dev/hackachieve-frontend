import React, {Component} from 'react';
import history from './../history';
import {connect} from 'react-redux'
import {Route, Router, Switch} from "react-router-dom";
import './App.scss';

/* Pages =========================================== */
import Landing from './pages/Landing/Landing';


class App extends Component {

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Landing}/>
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

