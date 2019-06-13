import React, {Component} from 'react';
import {connect} from 'react-redux'
import Modal from "../../../UI/Modal/Modal";
import {toggleModal} from "../../../../actions/uiActions";
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

        const {title} = this.props.myProps.shortTermGoal;

        const content = <React.Fragment >
            <div className="pop-inner">
			   <h2>Eat less carbs</h2>
               </div>
               <div className="top-bar-popup">
			   <a href="# "><img src="/images/icons/alert-circle.svg" alt=""/> Set priority</a>
			   <a href="# "><img src="images/icons/alert-circle.svg" alt=""/> Set due-date</a>
			   <a className="public" href="# "><img src="images/icons/eye.svg" alt=""/> Public</a>
			   </div>
               <div className="tags">
			    <label>Tags</label>
			    <a className="fitness" href="# "> Fitness</a>
				<a className="goal" href="# "> Personal goals</a>
				<a className="add-tag" href="# " > <img src="images/icons/plus.svg" alt=""/> Add</a>
			   </div>
               <div className="detail">
			     <h3>Description</h3>
			     <p>Cras eu elit congue, placerat dui ut, tincidunt nisl. Nulla leo elit, pharetra bibendum justo quis, cursus consectetur erat. Sed nec posuere turpis. Maecenas nec bibendum purus. Nulla fringilla, lorem iaculis iaculis fermentum, ligula nibh mollis ipsum, et scelerisque risus ante eu sem. Phasellus ac sagittis nisi. Suspendisse potenti. Nunc volutpat dui ipsum. Suspendisse potenti. In feugiat malesuada nisi quis laoreet. Pellentesque interdum sapien eget sapien facilisis porta. Nulla porta libero ut euismod dignissim.</p>
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
    return {myProps: ownProps};
};

export default connect(mapStateToProps, {
    //actions here
    toggleModal
})(GoalContentModal);

