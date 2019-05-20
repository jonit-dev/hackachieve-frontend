import React, {Component} from 'react';
import {connect} from 'react-redux'
import {loadGoals} from "../../../actions/goalsActions";
import Loading from "../../UI/Loading/Loading";
import LongTermGoal from "./LongTermGoal/LongTermGoal";
import {toggleModal} from "../../../actions/uiActions";
import {Mixpanel as mixpanel} from "../../../mixpanel";
import AddLongTermGoalModal from "./LongTermGoal/AddLongTermGoalModal";


class Board extends Component {

    componentDidMount() {
        this.props.loadGoals(0, this.props.boardShowGoals);

        mixpanel.track('board_visit')

    }

    onOpenLongTermModal() {

        console.log('opening long term modal');


        this.props.toggleModal('longTermGoal',0)

    }

    onRenderGoals() {

        if (!this.props.goals) {
            return <Loading/>
        } else {
            /* Render long term goals =========================================== */
            return this.props.goals.map((goal) => {
                if (goal.long_term_goals !== undefined) {
                    //lets render only long term goals that have nested short term goals (to save space on user board!)
                    if (goal.long_term_goals.length > 0) { // if there's goals to load...


                        return goal.long_term_goals.map((long_term_goal) => {


                            //progress bar variables
                            let completedGoalsString = `${long_term_goal.total_completed_goals}/${long_term_goal.total_goals}`;
                            let percentageCompleteString = long_term_goal.total_completed_goals / long_term_goal.total_goals;

                            return <LongTermGoal
                                key={long_term_goal.id}
                                id={long_term_goal.id}
                                boardName={goal.name}
                                title={long_term_goal.name}
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

    onRenderLongTermGoalModal() {
        if (this.props.modals.longTermGoal.status === true && !this.props.modals.longTermGoal.id) {
            //when there's not id, the board component is the one responsible for opening the modal.

            return <AddLongTermGoalModal/>


        } else {
            return null
        }
    }

    render() {
        return (
            <React.Fragment>
                <main className="board-main">

                    <div className="board-columns">

                        {this.onRenderGoals()}

                        <div className="board-column-add column-add-short-term-goal"
                             onClick={() => this.onOpenLongTermModal()}>
                            <div className="column-add-short-term-goal-btn"></div>
                            <div className="column-add-short-term-goal-text">Add Long Term Goal</div>

                        </div>


                    </div>

                    {this.onRenderLongTermGoalModal()}


                </main>


            </React.Fragment>
        );
    }
}

const filteredGoals = (goals, filter) => {
   return  filter === 'All' ? goals : goals.filter(goal => goal.name == filter);
}

const mapStateToProps = (state) => {

    return {
        goals: filteredGoals(state.goal.goals, state.goal.filter),
        boardShowGoals: state.ui.boardShowGoals,
        modals: state.ui.modals
    };
};

export default connect(mapStateToProps, {
    //actions here
    loadGoals,
    toggleModal
})(Board);

