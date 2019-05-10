import React, {Component} from 'react';

import {connect} from 'react-redux'
import Moment from 'react-moment';
import ShortTermGoal from "../ShortTermGoal/ShortTermGoal";
import {deleteGoal, loadGoals} from "../../../../actions/goalsActions";
import {toggleModal} from "../../../../actions/uiActions";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import AddShortTermGoalModal from "../ShortTermGoal/AddShortTermGoalModal";
import AddLongTermGoalModal from "./AddLongTermGoalModal";

class LongTermGoal extends Component {

    onConvertBoardNameClass(boardName) {

        if (boardName.indexOf(' ') > -1) {
            return boardName.split(' ').join('-').toLowerCase();
        } else {
            return boardName.toLowerCase();
        }
    }

    onRenderShortTermGoalModal() {

        if (this.props.modals.shortTermGoal.status === true && this.props.modals.shortTermGoal.id === this.props.myProps.id) {
            return <AddShortTermGoalModal longTermGoalId={this.props.myProps.id}/>
        } else {
            return null
        }
    }

    onRenderLongTermGoalModal() {
        if (this.props.modals.longTermGoal.status === true && this.props.modals.longTermGoal.id === this.props.myProps.id) { //make sure we are opening the right modal





            return <AddLongTermGoalModal longTermGoalId={this.props.myProps.id}/>





        } else {
            return null
        }
    }


    onDeleteLongTermGoal() {
        console.log('deleting long term goal');
    }


    onOpenShortTermGoalModal(longTermGoalId) {
        this.props.toggleModal('shortTermGoal', longTermGoalId); //toggle a specific modal by triggering this action
    }

    onOpenLongTermGoalModal(longTermGoalId) {
        this.props.toggleModal('longTermGoal', longTermGoalId);
    }

    onRenderShortTermGoals() {

        if (this.props.myProps.shortTermGoals !== undefined) {
            return this.props.myProps.shortTermGoals.map((short_term_goal) => {

                return <ShortTermGoal onOpenModal={() => this.onOpenShortTermGoalModal(this.props.myProps.id)}
                                      key={short_term_goal.id}
                                      id={short_term_goal.id}
                                      title={short_term_goal.title}
                                      description={short_term_goal.description}
                                      deadline={short_term_goal.deadline}
                                      status={short_term_goal.status}
                />

            });
        } else {
            return null;
        }


    }

    render() {
        return (
            <React.Fragment>
                <div
                    className={`board-column column-other column-${this.onConvertBoardNameClass(this.props.myProps.boardName)}`}>
                    <div className="column-header">
                        <div className="column-info">
                            <div
                                className={`column-icon ${this.onConvertBoardNameClass(this.props.myProps.boardName)}-icon`}>
                            </div>
                            <div
                                className={`column-board color-other color-${this.onConvertBoardNameClass(this.props.myProps.boardName)}`}>
                                {this.props.myProps.boardName}
                            </div>
                        </div>

                        <div className="column-title">
                            {this.props.myProps.title}
                        </div>
                        <Dropdown
                            triggerParentDelete={() => this.onDeleteLongTermGoal()}
                            triggerParentOpenModal={() => this.onOpenLongTermGoalModal(this.props.myProps.id)}/>
                    </div>

                    <div className="column-status">

                        <div className="column-status-completed">
                            <div className="column-status-completed-icon"></div>
                            <div className="column-status-completed-text">
                                {this.props.myProps.completedGoalsProportion} COMPLETED
                            </div>

                        </div>


                        <div className="column-status-deadline">
                            <div className="column-status-deadline-icon"></div>
                            <div className="column-status-deadline-text">
                                <Moment format="D MMMM, YY">{this.props.myProps.deadline}</Moment>
                            </div>

                        </div>

                        <div className="hackachieve-progress-bar w3-light-grey w3-round" id="goal-progress">
                            <div className="w3-container w3-round hackachieve-bar"
                                 style={{"width": (this.props.myProps.percentageComplete ? this.props.myProps.percentageComplete : 0)}}>&nbsp;</div>
                        </div>


                    </div>

                    <div className="column-body" data-simplebar data-simplebar-auto-hide="false">
                        <div>{this.onRenderShortTermGoals()}</div>
                    </div>

                    <div className="column-footer">

                        <div className="column-add-short-term-goal" onClick={() => {
                            this.onOpenShortTermGoalModal(this.props.myProps.id)
                        }}>
                            <div className="column-add-short-term-goal-btn"></div>
                            <div className="column-add-short-term-goal-text">Add Short Term Goal
                            </div>
                        </div>


                    </div>


                </div>

                {this.onRenderShortTermGoalModal()}

                {this.onRenderLongTermGoalModal()}

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        myProps: ownProps,
        modals: state.ui.modals
    };
};

export default connect(mapStateToProps, {
    //actions here
    deleteGoal,
    loadGoals,
    toggleModal
})(LongTermGoal);

