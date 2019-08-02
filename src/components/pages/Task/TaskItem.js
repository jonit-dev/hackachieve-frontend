import Text from "../../../classes/Text";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTask } from "../../../actions/taskActions";
import { toggleModal } from "../../../actions/uiActions";
import EditTaskModal from "./EditTaskModal";

class TaskItem extends Component {
  componentDidMount() {
    console.log(this.props.myProps);
  }

  onOpenProjectModal() {
    this.props.toggleModal("editTaskModal", this.props.myProps.id); //toggle a specific modal by triggering this action
  }

  onRenderEditTaskModal() {
    if (
      this.props.modals.editTaskModal.status &&
      this.props.modals.editTaskModal.id === this.props.myProps.id
    ) {
      return <EditTaskModal task={this.props.myProps} />;
    } else {
      return null;
    }
  }

  render() {
    const {
      id,
      title,
      completed,
      checklist,
      deadline,
      description,
      priority
    } = this.props.myProps;

    return (
      <>
        <div
          onClick={() => this.onOpenProjectModal()}
          className={
            completed
              ? `task-item done ${priority ? "priority" : ""}`
              : `task-item ${priority ? "priority" : ""}`
          }
        >
          <div className={completed ? "task-check completed" : "task-check"}>
            <i className="far fa-check-circle"></i>
          </div>
          <div className="task-description">
            <span className={completed ? "strike" : ""}>
              <strong>{Text.capitalizeFirstLetter(title)} </strong>
              {description}
            </span>

            <div className="task-deadline">
              <i className="far fa-calendar-alt"></i>
              {moment(deadline.split("T")[0]).format("D MMMM, YY")}
            </div>
            <div
              className="task-delete"
              onClick={() => this.props.deleteTask(id)}
            >
              <i className="fas fa-trash-alt"></i>
            </div>
          </div>
        </div>
        {this.onRenderEditTaskModal()}
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    myProps: ownProps,
    modals: state.ui.modals
  };
};

export default connect(
  mapStateToProps,
  {
    //actions here
    deleteTask,
    toggleModal
  }
)(TaskItem);
