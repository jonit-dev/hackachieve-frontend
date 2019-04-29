import React, {Component} from 'react';
import {connect} from 'react-redux'
import {loadGoals} from "../../../actions/goalsActions";
import Loading from "../../UI/Loading/Loading";
import LongTermGoal from "./LongTermGoal/LongTermGoal";


class Board extends Component {

    componentDidMount() {

        //load all short term and long term goals
        this.props.loadGoals(0, 'all');
    }

    onRenderGoals() {

        if (!this.props.goals) {
            return <Loading/>
        } else {
            /* Render long term goals =========================================== */
            return this.props.goals.map((goal) => {
                if (goal.long_term_goals !== undefined) {
                    //lets render only long term goals that have nested short term goals (to save space on user board!)
                    if (goal.long_term_goals.length > 0) {


                        return goal.long_term_goals.map((long_term_goal) => {


                            //progress bar variables
                            let completedGoalsString = `${long_term_goal.total_completed_goals}/${long_term_goal.total_goals}`;
                            let percentageCompleteString = long_term_goal.total_completed_goals / long_term_goal.total_goals;

                            return <LongTermGoal
                                key={long_term_goal.id}
                                id={long_term_goal.id}
                                boardName={goal.name}
                                title={goal.description}
                                completedGoalsProportion={completedGoalsString}
                                deadline={long_term_goal.deadline}
                                shortTermGoals={long_term_goal.short_term_goals}
                                percentageComplete={percentageCompleteString}
                            />
                        });
                    }
                }

                return null;


            });
        }

    }

    render() {
        return (
            <React.Fragment>
                <main className="board-main">

                    <div className="board-columns">

                        {this.onRenderGoals()}

                        <div className="board-column-add column-add-short-term-goal">
                            <div className="column-add-short-term-goal-btn"></div>
                            <div className="column-add-short-term-goal-text">Add Main Goal</div>

                        </div>


                        {/*{(this.state.isMainGoalModalVisible ?*/}
                        {/*<Modal title="Add a Main Goal"*/}
                        {/*hasActions={false} visible={true}*/}
                        {/*onOpenMainGoalModal={() => {*/}
                        {/*this.onOpenMainGoalModal()*/}
                        {/*}}*/}
                        {/*>*/}
                        {/*<AddMainGoalPartial/>*/}
                        {/*</Modal>*/}
                        {/*: null)}*/}


                    </div>


                </main>


            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {goals: state.goal.goals};
};

export default connect(mapStateToProps, {
    //actions here
    loadGoals
})(Board);

