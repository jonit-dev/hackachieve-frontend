import React, {Component} from 'react';
import {connect} from 'react-redux'
import Modal from "../../../UI/Modal/Modal";
import {toggleModal} from "../../../../actions/uiActions";
import Moment from "react-moment";


class GoalContentModal extends Component {

    onClose() {
        this.props.toggleModal('goalContent', this.props.myProps.shortTermGoal.id);
    }

    onEdit() {
        this.props.toggleModal('editShortTermGoal', this.props.myProps.shortTermGoal.id);
    }

    onRenderStatus(status) {
        switch (status) {
            case 1:
                return 'Pending';
            case 2:
                return 'On going...';
            case 3:
                return 'Done';
            default:
                return null
        }
    }

    render() {

        const {title, description, deadline, status} = this.props.myProps.shortTermGoal;

        const content = <React.Fragment>
            <p><strong>Deadline: </strong><Moment format="D MMMM, YYYY">{deadline}</Moment></p>
            <p className="modal-description"><strong>Description: </strong>{description}</p>
            <p><strong>Status: </strong>{this.onRenderStatus(status)}</p>
        </React.Fragment>;


        const actions = <React.Fragment>
            <button className="ui button positive" onClick={() => this.onEdit()}>Edit</button>
            <button className="ui button negative" onClick={() => this.onClose()}>Cancel</button>
        </React.Fragment>;

        return (
            <Modal
                name="goalContent"
                title={title}
                content={content}
                actions={actions}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {myProps: ownProps};
};

export default connect(mapStateToProps, {
    //actions here
    toggleModal
})(GoalContentModal);

