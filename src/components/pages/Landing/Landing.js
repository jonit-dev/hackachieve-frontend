import React, {Component} from 'react';

import {connect} from 'react-redux'

class Landing extends Component {

    render() {
        return (
            <div>Landing page!</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, {
    //actions here
})(Landing);

