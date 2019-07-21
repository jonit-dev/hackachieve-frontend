import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadGoals,
  loadUserGoalsCategories,
  reorderGoal
} from "../../../actions/goalsActions";
import Loading from "../../UI/Loading/Loading";
import LongTermGoal from "./LongTermGoal/LongTermGoal";
import { toggleModal } from "../../../actions/uiActions";
import AddLongTermGoalModal from "./LongTermGoal/AddLongTermGoalModal";
import { changeBoardShowGoal } from "../../../actions/boardActions";
import Joy from "../../onboarding";
import Analytics from "../../../analytics/Analytics";
import { isMobile } from "react-device-detect";
import { DragDropContext } from "react-beautiful-dnd";

class Board extends Component {
  componentDidMount() {
    this.props.loadGoals(0, this.props.boardShowGoals);

    this.props.loadUserGoalsCategories();

    Analytics.track("board_visit", {
      eventCategory: "pages",
      eventAction: "board_visit"
    });
  }

  onOpenLongTermModal() {
    console.log("opening long term modal");
    this.props.toggleModal("longTermGoal", 0);
  }

  onRenderGoals() {
    // if there's our async call to API is not answered yet, just show a loading screen
    if (!this.props.goals) {
      return <Loading />;
    } else {
      /* Render long term goals =========================================== */
      return this.props.goals.map(goal => {
        if (goal.long_term_goals !== undefined) {
          //lets render only long term goals that have nested short term goals (to save space on user board!)
          if (goal.long_term_goals.length > 0) {
            // if there's goals to load...

            return goal.long_term_goals.map(long_term_goal => {
              //progress bar variables
              let completedGoalsString = `${long_term_goal.total_completed_goals}/${long_term_goal.total_goals}`;
              let percentageCompleteString =
                long_term_goal.total_completed_goals /
                long_term_goal.total_goals;

              return (
                <LongTermGoal
                  key={long_term_goal.id}
                  id={long_term_goal.id}
                  boardName={goal.name}
                  title={long_term_goal.name}
                  description={long_term_goal.description}
                  completedGoalsProportion={completedGoalsString}
                  deadline={long_term_goal.deadline}
                  shortTermGoals={long_term_goal.short_term_goals}
                  percentageComplete={percentageCompleteString}
                  filter={this.props.filter}
                />
              );
            });
          }
        }

        return null;
      });
    }
  }

  onRenderLongTermGoalModal() {
    if (
      this.props.modals.longTermGoal.status === true &&
      !this.props.modals.longTermGoal.id
    ) {
      //when there's not id, the board component is the one responsible for opening the modal.

      return <AddLongTermGoalModal />;
    } else {
      return null;
    }
  }

  onHandleBoardSwitchItem(type) {
    if (type === this.props.boardShowGoals) {
      return "board-switch-item switch-active";
    } else {
      return "board-switch-item";
    }
  }

  onBoardSwitch(type) {
    this.props.changeBoardShowGoal(type).then(() => {
      this.props.loadGoals(0, this.props.boardShowGoals);
    });
  }

  onStartOnboardingTutorial() {
    let onboarding = JSON.parse(localStorage.getItem("onboarding")); //check if onboarding tutorial was made

    if (!onboarding) {
      return <Joy />; //start onboarding tutorial
    } else {
      // if user already did the onboarding tutorial, start over
      return null;
    }
  }

  // React Drag and Drop callbacks ========================================

  onDragStart(start, provided) {
    console.log("onDragStart!");
    // console.log(start);
    // console.log(provided);
  }
  onDragUpdate(update, provided) {
    console.log("onDragUpdate!");
    // console.log(update);
    // console.log(provided);
  }
  onDragEnd(result) {
    console.log("onDragEnd!");
    console.log(result);

    const { destination, source, draggableId } = result;

    // if there's no destination, do nothing!
    if (!destination) {
      return;
    }

    //if destination and source are the same, do nothing!
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //reorder tasks

    //we should get the target id

    const longTermGoalId = destination.droppableId;

    const longTermGoal = this.props.goals.find(
      goal =>
        goal.long_term_goals.length &&
        goal.long_term_goals.find(ltg => ltg.id === longTermGoalId)
    ).long_term_goals[0];

    const targetElement = longTermGoal.short_term_goals[destination.index];

    console.log("Target element:");
    console.log(targetElement);

    //sync it in database
    if (draggableId.includes("short-term-goal")) {
      //same column movement
      if (destination.droppableId === source.droppableId) {
        console.log("same column movement");
        const goalId = draggableId.split("-")[3];
        this.props.reorderGoal("short-term-goal", goalId, destination.index);
        this.props.reorderGoal(
          "short-term-goal",
          targetElement.id,
          source.index
        );

        this.props.loadGoals(0, this.props.boardShowGoals); //refresh board
      } else {
        //different column movements

        console.log("different columns movement");
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <main className="board-main">
          <div className="board-columns">
            {isMobile ? (
              <div
                className="board-column-add column-add-short-term-goal"
                onClick={() => this.onOpenLongTermModal()}
              >
                <div className="column-add-short-term-goal-btn"></div>
                <div className="column-add-short-term-goal-text">
                  Add Long Term Goal
                </div>
              </div>
            ) : (
              <p></p>
            )}

            {/* Drag And drop context */}
            <DragDropContext
              onDragStart={() => this.onDragStart()}
              onDragUpdate={() => this.onDragUpdate()}
              onDragEnd={result => this.onDragEnd(result)}
            >
              {this.onRenderGoals()}
            </DragDropContext>

            {this.props.goals && this.onStartOnboardingTutorial()}

            {!isMobile ? (
              <div
                className="board-column-add column-add-short-term-goal"
                onClick={() => this.onOpenLongTermModal()}
              >
                <div className="column-add-short-term-goal-btn"></div>
                <div className="column-add-short-term-goal-text">
                  Add Long Term Goal
                </div>
              </div>
            ) : (
              <p></p>
            )}
          </div>

          {this.onRenderLongTermGoalModal()}
        </main>

        <div className="i-phone">
          <div className="board-switch">
            <div
              className={this.onHandleBoardSwitchItem("all")}
              onClick={() => this.onBoardSwitch("all")}
            >
              <div className="board-switch-icon"></div>
              <div className="board-switch-text">ALL</div>
            </div>
            <div
              className={this.onHandleBoardSwitchItem("standby")}
              onClick={() => this.onBoardSwitch("standby")}
            >
              <div className="board-switch-icon"></div>
              <div className="board-switch-text">PENDING</div>
            </div>

            <div className="add-main">
              <div className="plus"></div>
            </div>
            <div
              className={this.onHandleBoardSwitchItem("ongoing")}
              onClick={() => this.onBoardSwitch("ongoing")}
            >
              <div className="board-switch-icon"></div>
              <div className="board-switch-text">ON GOING</div>
            </div>
            <div
              className={this.onHandleBoardSwitchItem("completed")}
              onClick={() => this.onBoardSwitch("completed")}
            >
              <div className="board-switch-icon"></div>
              <div className="board-switch-text">COMPLETED</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const filteredGoals = (goals, filter) => {
  return filter === "All" || filter === "week"
    ? goals
    : goals.filter(goal => goal.name === filter);
};

const mapStateToProps = state => {
  return {
    goals: filteredGoals(state.goal.goals, state.goal.filter),
    boardShowGoals: state.ui.boardShowGoals,
    modals: state.ui.modals,
    filter: state.goal.filter
  };
};

export default connect(
  mapStateToProps,
  {
    //actions here
    loadGoals,
    toggleModal,
    changeBoardShowGoal,
    loadUserGoalsCategories,
    reorderGoal
  }
)(Board);
