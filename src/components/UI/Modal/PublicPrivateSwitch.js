import React, { Component } from "react";

import { connect } from "react-redux";
import moment from "moment";
import { editGoals, loadGoals } from "../../../actions/goalsActions";
import { toggleModal } from "../../../actions/uiActions";

class PublicPrivateSwitch extends Component {
  state = {
    publicStatus: ""
  };

  componentDidMount() {
    !this.props.myProps.shortTermGoal.is_public
      ? this.setState({ publicStatus: "Private" })
      : this.setState({ publicStatus: "Public" });
  }

  onChangePublicStatus() {
    let formOutput = {
      goal_id: this.props.myProps.shortTermGoal.id,
      goal_data: {
        column: this.props.myProps.shortTermGoal.column_id,
        deadline: moment(this.props.myProps.shortTermGoal.deadline).format(
          "YYYY-MM-DD"
        ),
        description: this.props.myProps.shortTermGoal.description,
        duration_hrs: this.props.myProps.shortTermGoal.duration_hrs,
        priority: this.props.myProps.shortTermGoal.priority,
        title: this.props.myProps.shortTermGoal.title,
        is_public: !this.props.myProps.shortTermGoal.is_public
      }
    };

    this.props.editGoals(formOutput).then(response => {
      const { status } = response;

      if (status === 200) {
        this.props.loadGoals(
          this.props.currentProjectId,
          this.props.boardShowGoals
        ); //refresh goals
        setTimeout(() => {
          this.props.toggleModal("goalContent"); //close modal once goal public status is change.
        }, 500);
      }
    });
  }

  render() {
    if (this.state.publicStatus === "Public") {
      return (
        <a
          className="public"
          href="# "
          onClick={() => this.onChangePublicStatus()}
        >
          <i className="far fa-eye" />
          {this.state.publicStatus}
        </a>
      );
    } else {
      return (
        <a
          className="private"
          href="# "
          onClick={() => this.onChangePublicStatus()}
        >
          <i className="far fa-eye-slash" />
          {this.state.publicStatus}
        </a>
      );
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    myProps: ownProps,
    boardShowGoals: state.ui.boardShowGoals,
    currentProjectId: state.projects.currentProjectId
  };
};

export default connect(
  mapStateToProps,
  {
    //actions here
    loadGoals,
    editGoals,
    toggleModal
  }
)(PublicPrivateSwitch);
