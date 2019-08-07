import React, { Component } from "react";
import { changeSelectedPanel } from "../../../actions/uiActions";

import { connect } from "react-redux";

class BoardSwitch extends Component {
  onHandleBoardSwitchItem(type) {
    if (type === this.props.selectedPanel) {
      return "board-switch-item switch-active";
    } else {
      return "board-switch-item";
    }
  }

  onBoardSwitch(panel) {
    this.props.changeSelectedPanel(panel);
  }

  render() {
    return (
      <>
        <div className="i-phone">
          <div className="board-switch">
            <div
              className={this.onHandleBoardSwitchItem("board")}
              onClick={() => this.onBoardSwitch("board")}
            >
              <div className="board-switch-icon"></div>
              <div className="board-switch-text">Board</div>
            </div>
            <div
              className={this.onHandleBoardSwitchItem("tasks")}
              onClick={() => this.onBoardSwitch("tasks")}
            >
              <div className="board-switch-icon"></div>
              <div className="board-switch-text">Tasks</div>
            </div>

            <div className="add-main">
              <div className="plus"></div>
            </div>
            <div
              className={this.onHandleBoardSwitchItem("projects")}
              onClick={() => this.onBoardSwitch("projects")}
            >
              <div className="board-switch-icon"></div>
              <div className="board-switch-text">Projects</div>
            </div>
          </div>
        </div>
      </>
    );
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
    changeSelectedPanel
  }
)(BoardSwitch);
