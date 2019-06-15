import React, {Component} from 'react';
import {connect} from 'react-redux'
import Modal from "../../../UI/Modal/Modal";
import {toggleModal} from "../../../../actions/uiActions";
import Moment from "react-moment";
import ChecklistHandler from "../../../UI/forms/ChecklistHandler";
import LabelHandler from "../../../UI/forms/LabelHandler";

// import Moment from "react-moment";


class GoalContentModal extends Component {


    onClose() {
        this.props.toggleModal('goalContent', this.props.myProps.shortTermGoal.id);
    }

    onEdit() {
        this.props.toggleModal('goalContent', this.props.myProps.shortTermGoal.id);
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

            <div className="top-bar-popup">
                <a href="# " onClick={() => this.onEdit()}><img src="/images/icons/alert-circle.svg" alt=""/>
                    <strong>Status: {this.onRenderStatus(status)}</strong>
                </a>
                <a href="# " onClick={() => this.onEdit()}><img src="images/icons/alert-circle.svg" alt=""/>
                    <strong>Deadline:</strong> <Moment format="D MMMM, YYYY">{deadline}</Moment>
                </a>
                {/*<a className="public" href="# "><img src="images/icons/eye.svg" alt=""/> Public</a>*/}
            </div>



            {/*<div className="tags">*/}
            {/* <label>Tags</label>*/}
            {/* <a className="fitness" href="# "> Fitness</a>*/}
            {/*<a className="goal" href="# "> Personal goals</a>*/}
            {/*<a className="add-tag" href="# " > <img src="images/icons/plus.svg" alt=""/> Add</a>*/}
            {/*</div>*/}

            <LabelHandler/>


            <div className="detail">
                <h3>Description</h3>
                <p>
                    {description}
                </p>


                <ChecklistHandler/>


            </div>

        </React.Fragment>;


        const actions = <React.Fragment>
            <button className="add-task" onClick={() => this.onEdit()}>Edit</button>
            <button className="cancel" onClick={() => this.onClose()}>Cancel</button>
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
    return {
        myProps: ownProps,
        modals: state.ui.modals,


    };
};

export default connect(mapStateToProps, {
    //actions here
    toggleModal,

})(GoalContentModal);

