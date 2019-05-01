import React, {Component} from 'react';

import {connect} from 'react-redux'
import Modal from "../../../UI/Modal/Modal";
import {toggleModal} from "../../../../actions/uiActions";

class AddShortTermGoal extends Component {

    onClose() {
        this.props.toggleModal('shortTermGoal');
    }

    render() {
        const title = 'Add short-term goal';
        const content = <React.Fragment>
            <p>This is my <strong>modal</strong></p>
        </React.Fragment>;
        const actions = <React.Fragment>
            <div className="ui approve button">Approve</div>
            <div className="ui button">Neutral</div>
            <div className="ui cancel button" onClick={() => this.onClose()}>Close</div>
        </React.Fragment>;

        return (
            <Modal name='shortTermGoal' title={title} content={content} actions={actions}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        modals: state.ui.modals
    };
};

export default connect(mapStateToProps, {
    //actions here
    toggleModal
})(AddShortTermGoal);

