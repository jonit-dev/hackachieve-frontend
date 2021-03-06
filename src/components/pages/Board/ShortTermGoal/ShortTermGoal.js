import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import {
  deleteGoal,
  goalChangeStatus,
  goalSetPriority,
  loadGoals
} from "../../../../actions/goalsActions";
import { toggleModal } from "../../../../actions/uiActions";
import GoalContentModal from "./GoalContentModal";
import EditShortTermGoalModal from "./EditShortTermGoalModal";
import { Draggable } from "react-beautiful-dnd";

class ShortTermGoal extends Component {
  characterLimit = 50;

  onGoalSetStatus(statusId) {
    // console.log('setting new goal status');

    this.props
      .goalChangeStatus(this.props.myProps.shortTermGoal.id, statusId)
      .then(() => {
        this.props.loadGoals(
          this.props.currentProjectId,
          this.props.boardShowGoals
        );
      });
  }

  onGoalSetPriority() {
    console.log("setting goal priority");

    const { id, priority } = this.props.myProps.shortTermGoal;

    if (!priority) {
      this.props.goalSetPriority(id, 1).then(() => {
        this.props.loadGoals(
          this.props.currentProjectId,
          this.props.boardShowGoals
        );
      });
    } else {
      this.props.goalSetPriority(id, 0).then(() => {
        this.props.loadGoals(
          this.props.currentProjectId,
          this.props.boardShowGoals
        );
      });
    }
  }

  onDeleteGoal(id) {
    this.props.deleteGoal(id).then(() => {
      this.props.loadGoals(
        this.props.currentProjectId,
        this.props.boardShowGoals
      );
    });
  }

  onEditGoal() {
    this.props.toggleModal(
      "editShortTermGoal",
      this.props.myProps.shortTermGoal.id
    );
  }

  onRenderActions() {
    switch (this.props.myProps.shortTermGoal.status) {
      case 1: //pending
        return (
          <div
            className="column-card-button"
            onClick={e => {
              e.stopPropagation();
              this.onGoalSetStatus(2);
            }}
          >
            START
          </div>
        );

      case 2: //on going
        return (
          <React.Fragment>
            <div
              className="repeat-icon"
              onClick={e => {
                e.stopPropagation();
                this.onGoalSetStatus(1);
              }}
            ></div>

            <div
              className="column-card-button column-card-active"
              onClick={e => {
                e.stopPropagation();
                this.onGoalSetStatus(3);
              }}
            >
              COMPLETE
            </div>

            <div className="column-card-text-button">
              <i className="fas fa-hourglass-half"></i>
            </div>
          </React.Fragment>
        );

      case 3: //done
        return null;

      default:
        return null;
    }
  }

  onOpenGoalContentModal() {
    this.props.toggleModal("goalContent", this.props.myProps.shortTermGoal.id);
  }

  onRenderPriority(priority) {
    return priority === false || priority === 0
      ? "priority-icon"
      : "priority-icon priority-icon-active";
  }

  onRenderGoalContentModal() {
    if (this.props.modals.goalContent.status) {
      if (
        this.props.modals.goalContent.id === this.props.myProps.shortTermGoal.id
      ) {
        return (
          <GoalContentModal shortTermGoal={this.props.myProps.shortTermGoal} />
        );
      }
    } else {
      return null;
    }
  }

  renderEditShortTermModal() {
    if (
      this.props.modals.editShortTermGoal.status &&
      this.props.modals.editShortTermGoal.id ===
        this.props.myProps.shortTermGoal.id
    ) {
      return (
        <EditShortTermGoalModal
          shortTermGoal={this.props.myProps.shortTermGoal}
          deadline={this.props.deadline}
        />
      );
    } else {
      return null;
    }
  }

  getStyle(style, snapshot) {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      // cannot be 0, but make it super tiny
      transitionDuration: `0.001s`
    };
  }

  onRenderLabels() {
    const { labels } = this.props.myProps.shortTermGoal;

    if (labels) {
      return labels.map(label => {
        return (
          <div className="label" key={label.id}>
            {label.name}
          </div>
        );
      });
    }
  }

  render() {
    let goalStyle, cardCategoryStyle;

    const {
      id,
      description,
      deadline,
      title,
      priority,
      status,
      member
    } = this.props.myProps.shortTermGoal;

    cardCategoryStyle = "card-active-" + this.props.myProps.longTermBoardName;

    switch (status) {
      case 2: //on going
        goalStyle = `column-card ${cardCategoryStyle}`;
        break;

      case 3: //completed
        goalStyle = `column-card column-card-completed`;
        break;

      default:
        goalStyle = "column-card";
        break;
    }

    if (priority) {
      goalStyle += " column-card-priority";
    }

    return (
      <Draggable
        draggableId={`short-term-goal-${id}`}
        index={this.props.myProps.index}
      >
        {(provided, snapshot) => (
          <div
            className={goalStyle}
            onClick={e => {
              e.stopPropagation();
              this.onOpenGoalContentModal();
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Dropdown
              triggerParentDelete={() => this.onDeleteGoal(id)}
              triggerParentOpenModal={this.props.myProps.onOpenModal}
              triggerParentEditModal={() => this.onEditGoal()}
            />

            <div className="column-card-body">
              <div className="column-card-labels">{this.onRenderLabels()}</div>
              <div className="column-card-title truncate">{title}</div>
              <div className="column-card-description truncate">
                {description}
              </div>
              <div className="column-card-deadline">
                <i className="fas fa-calendar-alt"></i>
                <div className="column-card-deadline-text">
                  {deadline ? (
                    <Moment format="D MMMM, YY">{deadline}</Moment>
                  ) : (
                    "No deadline"
                  )}
                </div>
              </div>

            <div className="member-icons">
              <ul>
                {member.map(user=>
                <li key={user.id}>
                  <span className="member">{user.first_name.charAt(0).toUpperCase()}</span>
                </li>)}
              </ul>
            </div>
            </div>

            <div className="column-card-footer">
              <div
                className={this.onRenderPriority(priority)}
                onClick={e => {
                  e.stopPropagation();
                  this.onGoalSetPriority();
                }}
              >
              </div>
              <div className="column-footer-actions-group">
                {this.onRenderActions()}
              </div>
            </div>
                        



            {this.onRenderGoalContentModal()}
            {this.renderEditShortTermModal()}
          </div>
        )}
      </Draggable>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { modals, boardShowGoals } = state.ui;

  return {
    myProps: ownProps,
    modals: modals,
    boardShowGoals: boardShowGoals,
    currentProjectId: state.projects.currentProjectId
  };
};

export default connect(
  mapStateToProps,
  {
    //actions here
    deleteGoal,
    loadGoals,
    toggleModal,
    goalChangeStatus,
    goalSetPriority
  }
)(ShortTermGoal);
