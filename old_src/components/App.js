import React, {Component} from 'react';
import './App.scss'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from "./Pages/Landing/Login/Login"
import Register from "./Pages/Landing/Register/Register"
import Home from "./Pages/Landing/Home/Home"
import NotFound from "./Pages/Base/NotFound/NotFound";
import Header from "./Pages/Base/Header/Header";
import Footer from "./Pages/Base/Footer/Footer";
import Board from './Pages/Board/Board';

// import Main from './Pages/Board/Main';


class App extends Component {
    constructor() {
        super();
        this.state = {
            board_api_endpoint: "/boards/show/0/all",
            boards: [],
        }
    }

    update_board_api_endpoint(api) {
        this.setState({board_api_endpoint: api});
    }

    componentDidMount() {
        this.update_board_api_endpoint(this.state.board_api_endpoint);
    }

    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Header update_board_api_endpoint={this.update_board_api_endpoint.bind(this)}/>

                    <Switch>
                        <Route path="/" component={Home} exact/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/board" render={() => (
                            <Board board_api_endpoint={this.state.board_api_endpoint}/>
                        )}/>
                        {/*<Route path="/main" component={Main}/>*/}
                        <Route component={NotFound}></Route>
                    </Switch>

                    <Footer/>
                </React.Fragment>

            </BrowserRouter>
        );
    }
}

export default App;
