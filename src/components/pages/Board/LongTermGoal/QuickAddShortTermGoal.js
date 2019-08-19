import React, { Component } from "react";
import { connect } from "react-redux";
import { createGoal, loadGoals } from "../../../../actions/goalsActions";

class QuickAddShortTermGoal extends Component {
  state = {
    quickShortTermGoal: {
      title: ""
    }
  };

  onHandleKeydown(e) {
    if (e.key === "Enter") {
      console.log("adding new goal...");

      console.log(this.state);

      this.props.ownProps.onOpenQuickAddShortTermGoal();

      this.props
        .createGoal({
          column: this.props.ownProps.column,
          title: this.state.quickShortTermGoal.title
        })
        .then(response => {
          this.props.loadGoals(
            this.props.currentProjectId,
            this.props.boardShowGoals
          );

          this.setState({
            quickShortTermGoal: {
              ...this.state.quickShortTermGoal,
              title: ""
            }
          });
        });
    }
  }

  onRenderQuickAddShortTermGoal() {
    if (this.props.ownProps.showQuickAddShortTermGoal) {
      return (
        <textarea
          className="textarea"
          value={this.state.quickShortTermGoal.title}
          onKeyPress={e => this.onHandleKeydown(e)}
          onChange={e =>
            this.setState({
              quickShortTermGoal: {
                ...this.state.quickShortTermGoal,
                title: e.target.value
              }
            })
          }
          placeholder="Write your new goal name and hit ENTER..."
        ></textarea>
      );
    } else {
      return null;
    }
  }

  render() {
    return <>{this.onRenderQuickAddShortTermGoal()}</>;
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    ownProps,
    currentProjectId: state.projects.currentProjectId,
    boardShowGoals: state.ui.boardShowGoals
  };
};

export default connect(
  mapStateToProps,
  {
    //actions here
    createGoal,
    loadGoals
  }
)(QuickAddShortTermGoal);
