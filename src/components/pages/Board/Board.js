import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadGoals,
  loadUserGoalsCategories,
  reorderGoal,
  updateGoal,
  updateLongTermGoalState
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
import { setCurrentProject } from "../../../actions/projectActions";
import InviteMemberModal from "./InviteMemberModal";

class Board extends Component {
  componentDidMount() {
    const projectId = parseInt(this.props.myProps.projectId);

    this.props.setCurrentProject(projectId); //set currently loaded project to our state. It will be used by other components.

    this.props.loadGoals(projectId, this.props.boardShowGoals);

    this.props.loadUserGoalsCategories(projectId);

    Analytics.track("board_visit", {
      eventCategory: "pages",
      eventAction: "board_visit"
    });
  }

  onRenderInviteModal() {
    if (
      this.props.modals.inviteMember.status === true &&
      !this.props.modals.inviteMember.id
    ) {
      //when there's not id, the board component is the one responsible for opening the modal.
      return <InviteMemberModal />;
    } else {
      return null;
    }
  }

  onOpenInviteModal() {
    this.props.toggleModal("inviteMember"); //toggle a specific modal by triggering this action
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
      this.props.loadGoals(
        this.props.currentProjectId,
        this.props.boardShowGoals
      );
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

  findLongTermGoal(id) {
    const longTermGoals = [];
    this.props.goals.forEach(board => {
      if (board.long_term_goals.length) {
        board.long_term_goals.forEach(ltg => {
          longTermGoals.push(ltg);
        });
      }
    });

    return longTermGoals.find(ltg => ltg.id === id);
  }

  findShortTermGoal(longTermGoal, id) {
    return longTermGoal.short_term_goals.find(stg => stg.id === id);
  }

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

    //we will use it to manipulate our current state
    //eslint-disable-next-line
    Array.prototype.swap = function (x, y) {
      var b = this[x];
      this[x] = this[y];
      this[y] = b;
      return this;
    };

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

    if (draggableId.includes("short-term-goal")) {
      // Same column d&d movement ========================================

      const goalId = parseInt(draggableId.split("-")[3]);

      if (destination.droppableId === source.droppableId) {
        console.log("==> same column movement !!");

        const destinationLongTermGoal = this.findLongTermGoal(
          destination.droppableId
        );

        const targetElement =
          destinationLongTermGoal.short_term_goals[destination.index];

        const swappedShortTermGoals = destinationLongTermGoal.short_term_goals.swap(
          source.index,
          destination.index
        );

        let updatedLongTermGoal = destinationLongTermGoal;
        updatedLongTermGoal.short_term_goals = swappedShortTermGoals;

        // console.log(swappedShortTermGoals);
        this.props.updateLongTermGoalState(
          destinationLongTermGoal.id,
          updatedLongTermGoal
        );

        console.log(this.props.goals);

        // sync with DB

        this.props.reorderGoal("short-term-goal", goalId, destination.index);
        this.props.reorderGoal(
          "short-term-goal",
          targetElement.id,
          source.index
        );
      } else {
        // Swipe cards between columns ========================================

        // console.log("==> Swipe cards between columns!");

        const goalId = parseInt(draggableId.split("-")[3]);
        // console.log(`GOALID => ${goalId}`);

        // get the source long term goal

        let sourceLongTermGoal = this.findLongTermGoal(source.droppableId);
        let destinationLongTermGoal = this.findLongTermGoal(
          destination.droppableId
        );

        // get the card that was dragged
        const sourceShortTermGoal = sourceLongTermGoal.short_term_goals.find(
          stg => stg.id === goalId
        );

        //remove item from source long term goal

        sourceLongTermGoal.short_term_goals = sourceLongTermGoal.short_term_goals.filter(
          stg => stg.id !== goalId
        );

        console.log("updated source LTG");

        console.log(sourceLongTermGoal);
        this.props.updateLongTermGoalState(
          sourceLongTermGoal.id,
          sourceLongTermGoal
        );

        //add item into destination long term goal

        destinationLongTermGoal.short_term_goals.push(sourceShortTermGoal);

        console.log("updated destination LTG");
        console.log(destinationLongTermGoal);

        this.props.updateLongTermGoalState(
          destinationLongTermGoal.id,
          destinationLongTermGoal
        );

        //submit update request to server

        // update column_id and then send updated short term goal
        console.log(sourceShortTermGoal);
        sourceShortTermGoal.column_id = destination.droppableId;
        sourceShortTermGoal.deadline = sourceShortTermGoal.deadline.split(
          "T"
        )[0];
        sourceShortTermGoal.order_position = destination.index;

        this.props.updateGoal(sourceShortTermGoal);

        // console.log(this.props.goals);
      }
    }
  }

  render() {
    const {name}=this.props.currentProject;
    let member=this.props.currentProject.member?this.props.currentProject.member:[];
    return (
      <React.Fragment>
        <main className="board-main">
          <div className="board-columns">
            <div className="board-header-subnav">
              <ul>
                <li><a className="board-name" href="#/">{name}</a></li>
                {member.map(user=>
                <li key={user.id}>
                  <span className="member">{user.first_name.charAt(0).toUpperCase()}</span>
                </li>)}
                <li>
                  <a className="board-invite-btn" href="#/" onClick={() => this.onOpenInviteModal()}>Invite</a>
                </li>
              </ul>
            </div>
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
          {this.onRenderInviteModal()}
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

const mapStateToProps = (state, ownProps) => {
  return {
    myProps: ownProps,
    goals: filteredGoals(state.goal.goals, state.goal.filter),
    boardShowGoals: state.ui.boardShowGoals,
    modals: state.ui.modals,
    filter: state.goal.filter,
    projects: state.projects,
    currentProjectId: state.projects.currentProjectId,
    currentProject: state.projects.currentProject
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
    reorderGoal,
    updateGoal,
    updateLongTermGoalState,
    setCurrentProject
  }
)(Board);
