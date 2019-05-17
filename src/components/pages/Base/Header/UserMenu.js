import React, {Component} from 'react';
import {connect} from 'react-redux'

import {Link, NavLink} from "react-router-dom";
import {userLogout} from "../../../../actions/authActions";
import history from './../../../../history';

class UserMenu extends Component{
    render(){
        return(
                <div className="ui card">
                    { this.props.isLoggedIn && 
                            <div className="content" onClick={()=> this.props.userLogout()}>
                                <p>Logout</p>
                            </div>
                    }
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
    };
};

export default connect(mapStateToProps, {
    //actions here
    userLogout,
})(UserMenu);