import React, {Component} from 'react';
import {connect} from 'react-redux'
import Moment from "react-moment";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import {deleteGoal, goalChangeStatus, goalSetPriority, loadGoals} from "../../../../actions/goalsActions";
import {toggleModal} from "../../../../actions/uiActions";
import GoalContentModal from "./GoalContentModal";

class ShortTermGoal extends Component {

    characterLimit = 50;

    onGoalSetStatus(statusId) {

        console.log('setting new goal status');

        this.props.goalChangeStatus(this.props.myProps.shortTermGoal.id, statusId).then(() => {
            this.props.loadGoals(0, this.props.boardShowGoals);
        });

    }

    onGoalSetPriority() {

        console.log('setting goal priority');

        const {id, priority} = this.props.myProps.shortTermGoal;

        if (!priority) {
            this.props.goalSetPriority(id, 1).then(() => {
                this.props.loadGoals(0, this.props.boardShowGoals);
            })
        } else {
            this.props.goalSetPriority(id, 0).then(() => {
                this.props.loadGoals(0, this.props.boardShowGoals);
            });
        }

    }

    onDeleteGoal(id) {
        this.props.deleteGoal(id).then(() => {
            this.props.loadGoals(0, this.props.boardShowGoals);
        })
    }


    onRenderActions() {
        switch (this.props.myProps.shortTermGoal.status) {

            case 1: //pending

                return <div className="column-card-button" onClick={(e) => {
                    e.stopPropagation();
                    this.onGoalSetStatus(2)
                }}>
                    START
                </div>;


            case 2: //on going

                return <React.Fragment>
                    <div className="repeat-icon" onClick={(e) => {
                        e.stopPropagation();
                        this.onGoalSetStatus(1)
                    }}></div>

                    <div className="column-card-button column-card-active" onClick={(e) => {
                        e.stopPropagation();
                        this.onGoalSetStatus(3)
                    }}>
                        COMPLETE
                    </div>


                    <div className="column-card-text-button">
                        ON GOING
                    </div>
                </React.Fragment>;


            case 3: //done
                return null;

            default:
                return null;

        }
    }

    onOpenGoalContentModal() {

        console.log('opening goal content modal');
        this.props.toggleModal('goalContent', this.props.myProps.shortTermGoal.id);
    }

    onRenderPriority(priority) {

        return (priority === false || priority === 0 ? 'priority-icon' : 'priority-icon priority-icon-active');
    }

    onRenderGoalContentModal() {

        if (this.props.modals.goalContent.status) {

            if (this.props.modals.goalContent.id === this.props.myProps.shortTermGoal.id) {
                return <GoalContentModal shortTermGoal={this.props.myProps.shortTermGoal}
                />
            }
        } else {
            return null;
        }
    }

    render() {

        let goalStyle, cardCategoryStyle;


        const {id, description, deadline, title, priority, status} = this.props.myProps.shortTermGoal;


        cardCategoryStyle = 'card-active-blue';//todo: Set card style according to category.

        switch (status) {

            case 2: //on going
                goalStyle = `column-card ${cardCategoryStyle}`;
                break;

            case 3://completed
                goalStyle = `column-card column-card-completed`;
                break;

            default:
                goalStyle = 'column-card';
                break;
        }

        if(priority) {
            goalStyle += ' column-card-priority';
        }


        return (
            <div className={goalStyle} onClick={() => this.onOpenGoalContentModal()}>


                <Dropdown
                    triggerParentDelete={() => this.onDeleteGoal(id)}
                    triggerParentOpenModal={this.props.myProps.onOpenModal}
                />

                <div className="column-card-body">
                    <div className="column-card-title">{title}</div>
                    { description.length <= this.characterLimit
                        ? <div className="column-card-description">{description}</div> 
                        : <div className="column-card-description">{description.substring(0,this.characterLimit)+" ..."}</div>
                    }
                    <div className="column-card-deadline">
                        <div className="column-card-deadline-icon"></div>
                        <div className="column-card-deadline-text">
                            <Moment format="D MMMM, YY">{deadline}</Moment>
                        </div>
                    </div>
                </div>

                <div className="column-card-footer">
                    <div className={this.onRenderPriority(priority)} onClick={(e) => {
                        e.stopPropagation();
                        this.onGoalSetPriority()
                    }}></div>
                    <div className="column-footer-actions-group">
                        {this.onRenderActions()}
                    </div>
                </div>

                {this.onRenderGoalContentModal()}

            </div>


        );
    }
}


const mapStateToProps = (state, ownProps) => {

    const {modals, boardShowGoals} = state.ui;

    return {
        myProps: ownProps,
        modals: modals,
        boardShowGoals: boardShowGoals
    }
        ;
};

export default connect(mapStateToProps, {
    //actions here
    deleteGoal,
    loadGoals,
    toggleModal,
    goalChangeStatus,
    goalSetPriority
})(ShortTermGoal);

