import React, {Component} from 'react';
import {connect} from 'react-redux'
import {loadGoals} from "../../../actions/goalsActions";
import Loading from "../../UI/Loading/Loading";
import LongTermGoal from "./LongTermGoal/LongTermGoal";
import {toggleModal} from "../../../actions/uiActions";
import {Mixpanel as mixpanel} from "../../../mixpanel";
import AddLongTermGoalModal from "./LongTermGoal/AddLongTermGoalModal";
import {changeBoardShowGoal} from "../../../actions/boardActions";


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
                                description={long_term_goal.description}
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

    onHandleBoardSwitchItem(type) {

        if (type === this.props.boardShowGoals) {
            return 'board-switch-item switch-active';
        } else {

            return 'board-switch-item';
        }
    }

    onBoardSwitch(type) {

        this.props.changeBoardShowGoal(type).then(() => {
            this.props.loadGoals(0, this.props.boardShowGoals)
        });

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

                <footer className="footer">
                    <div className="ui container">
                        <div className="ui stackable inverted divided equal height stackable grid">
                            <div className="three wide column">
                                <h4 className="ui inverted header">About</h4>
                                <div className="ui inverted link list">
                                    <a href=" #" className="item">Sitemap</a>
                                    <a href=" #" className="item">Contact Us</a>
                                    <a href=" #" className="item">Religious Ceremonies</a>
                                    <a href=" #" className="item">Gazebo Plans</a>
                                </div>
                            </div>
                            <div className="three wide column center">
                                <h4 className="ui inverted header">Services</h4>
                                <div className="ui inverted link list">
                                    <a href=" #" className="item">Banana Pre-Order</a>
                                    <a href=" #" className="item">DNA FAQ</a>
                                    <a href=" #" className="item">How To Access</a>
                                    <a href=" #" className="item">Favorite X-Men</a>
                                </div>
                            </div>
                            <div className="seven wide column last">
                                <h4 className="ui inverted header">Footer Header</h4>
                                <p>Extra space for a call to action inside the footer that could help re-engage
                                    users.</p>
                            </div>
                        </div>
                    </div>

                </footer>

                <div className="i-phone">
                    <div className="board-switch">
                        <div className={this.onHandleBoardSwitchItem('all')}
                             onClick={() => this.onBoardSwitch('all')}
                        >
                            <div className="board-switch-icon"><i className="fas fa-check"></i></div>
                            <div className="board-switch-text">ALL GOALS</div>
                        </div>

                        <div className="add-main">
                            <div className="plus"></div>
                        </div>
                        <div className={this.onHandleBoardSwitchItem('completed')}
                             onClick={() => this.onBoardSwitch('completed')}>
                            <div className="board-switch-icon"><i className="fas fa-check"></i></div>
                            <div className="board-switch-text">COMPLETED GOALS</div>
                        </div>
                    </div>
                </div>


            </React.Fragment>
        );
    }
}

const filteredGoals = (goals, filter) => {
   return  filter === 'All' ? goals : goals.filter(goal => goal.name === filter);
};

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
    toggleModal,
    changeBoardShowGoal
})(Board);

