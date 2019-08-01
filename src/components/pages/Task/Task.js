import React, { Component } from "react";
import { connect } from "react-redux";
import TaskItem from "./TaskItem";
import { loadTasks } from "../../../actions/taskActions";
import Loading from "../../UI/Loading/Loading";

class Task extends Component {
  componentDidMount() {
    this.props.loadTasks(this.props.currentProjectId);
  }

  componentDidUpdate() {
    console.log(this.props.tasks);
  }

  onRenderTaskItems() {
    return !this.props.tasks.length ? (
      <Loading />
    ) : (
      this.props.tasks.map(task => (
        <TaskItem
          key={task.id}
          title={task.title}
          completed={task.completed}
          checklist={task.checklist}
          deadline={task.deadline}
          description={task.description}
          priority={task.priority}
        />
      ))
    );
  }

  render() {
    return (
      <main className="board-main">
        <div className="board-columns panel">
          <div className="panel-content">
            <div className="tasks">{this.onRenderTaskItems()}</div>
          </div>
        </div>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    tasks: state.tasks.taskItems,
    currentProjectId: state.projects.currentProjectId
  };
};

export default connect(
  mapStateToProps,
  {
    loadTasks
  }
)(Task);
