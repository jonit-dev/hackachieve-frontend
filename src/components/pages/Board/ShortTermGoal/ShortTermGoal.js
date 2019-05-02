import React, {Component} from 'react';
import {connect} from 'react-redux'
import Moment from "react-moment";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import {deleteGoal, loadGoals} from "../../../../actions/goalsActions";

class ShortTermGoal extends Component {

    onGoalSetStatus(statusId) {
        return null; //todo:goalsetstatus
    }

    onDeleteGoal(id) {
        this.props.deleteGoal(id).then(() => {
            this.props.loadGoals(0,'all');
        })
    }


    onRenderActions() {
        switch (this.props.myProps.status) {

            case 1: //pending

                return <div className="column-card-button" onClick={() => {
                    this.onGoalSetStatus(2)
                }}>
                    START
                </div>;


            case 2: //on going

                return <React.Fragment>
                    <div className="repeat-icon" onClick={() => {
                        this.onGoalSetStatus(1)
                    }}></div>

                    <div className="column-card-button column-card-active" onClick={() => {
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

    render() {

        let goalStyle, cardCategoryStyle;

        cardCategoryStyle = 'card-active-blue';//todo: Set card style according to category.

        switch (this.props.myProps.status) {


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


        return (
            <div className={goalStyle}>


                <Dropdown triggerParentDelete={() => this.onDeleteGoal(this.props.myProps.id)}/>

                <div className="column-card-body">
                    <div className="column-card-title">{this.props.myProps.title}</div>
                    <div className="column-card-description">{this.props.myProps.description}
                    </div>
                    <div className="column-card-deadline">
                        <div className="column-card-deadline-icon"></div>
                        <div className="column-card-deadline-text">
                            <Moment format="D MMMM, YY">{this.props.myProps.deadline}</Moment>
                        </div>
                    </div>
                </div>

                <div className="column-card-footer">
                    <div className="priority-icon"></div>
                    <div className="column-footer-actions-group">
                        {this.onRenderActions()}
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {myProps: ownProps};
};

export default connect(mapStateToProps, {
    //actions here
    deleteGoal,
    loadGoals
})(ShortTermGoal);

