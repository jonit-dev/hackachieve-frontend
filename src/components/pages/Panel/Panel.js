import React, { Component } from "react";
import Board from "../Board/Board";
import Project from "../Project/Project";
import Task from "../Task/Task";
import { connect } from "react-redux";

class Panel extends Component {
  state = {
    projectId: this.props.match.params.projectId
  };

  onRenderSelectedPanel() {
    switch (this.props.selectedPanel) {
      case "board":
        return <Board projectId={this.state.projectId} />;

      case "tasks":
        return <Task />;

      case "projects":
        return <Project />;

      default:
        return <Board projectId={this.state.projectId} />;
    }
  }

  render() {
    return <>{this.onRenderSelectedPanel()}</>;
  }
}
const mapStateToProps = state => {
  return {
    selectedPanel: state.ui.selectedPanel
  };
};

export default connect(
  mapStateToProps,
  {
    //actions here
  }
)(Panel);
