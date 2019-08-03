import React, { Component } from "react";
import { connect } from "react-redux";
import TaskItem from "./TaskItem";
import { loadTasks } from "../../../actions/taskActions";
import Loading from "../../UI/Loading/Loading";
import TaskAdd from "./TaskAdd";

class Task extends Component {
  componentDidMount() {
    this.props.loadTasks(this.props.currentProjectId);
  }

  componentDidUpdate() {
    console.log(this.props.tasks);
  }

  onRenderTaskItems() {
    if (this.props.tasks.length === 0) {
      return (
        <div className="no-tasks">
          No tasks added yet. Use the field above to add your first project
          task!
        </div>
      );
    }

    return !this.props.tasks.length ? (
      <Loading />
    ) : (
      this.props.tasks.map(task => <TaskItem key={task.id} {...task} />)
    );
  }

  render() {
    return (
      <main className="board-main">
        <div className="board-columns panel">
          <div className="panel-content">
            <div className="tasks">
              <TaskAdd />

              {this.onRenderTaskItems()}
            </div>
          </div>
        </div>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    tasks: state.tasks.taskItems,
    currentProjectId: state.projects.currentProjectId,
    modals: state.ui.modals
  };
};

export default connect(
  mapStateToProps,
  {
    loadTasks
  }
)(Task);
