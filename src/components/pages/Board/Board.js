import React, {Component} from 'react';

import {connect} from 'react-redux'

class Board extends Component {

    render() {
        return (
            <div>[BOARD]</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, {
    //actions here
})(Board);

