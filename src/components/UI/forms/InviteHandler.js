import React, { Component } from "react";
import Tags from "./Tags";

import { connect } from "react-redux";
import {
  Field,
  reduxForm,
  change,
  untouch,
  formValueSelector
} from "redux-form";
import {
  createLabels,
  deleteLabels,
  loadLabels,
  updateLabel
} from "../../../actions/goalLabelsAction";
import {
  searchUsers,
  inviteShortTermGoalMember
} from "../../../actions/projectActions";

import { loadGoals } from "../../../actions/goalsActions";

class InviteHandler extends Component {
  state = {
    //status: true,
    editableTag: {
      id: null,
      name: null
    }
  };

  updateTags = tags => {
    let members = [];
    tags.map(member => members.push({ id: member.id }));
    const { goalId } = this.props.myProps;
    const invitePayload = {
      id: goalId,
      member: members
    };

    this.props
      .inviteShortTermGoalMember(goalId, invitePayload)
      .then(response => {
        this.props.loadLabels(goalId);
        this.props.loadGoals(this.props.projectId, this.props.boardShowGoals);
      });
  };

  componentDidMount() {
    const goalId = this.props.myProps.goalId;
    console.log(`fetching labels from goal ${goalId}`);
    this.props.loadLabels(goalId);
  }

  resetFields = (formName, fieldsObj) => {
    Object.keys(fieldsObj).forEach(fieldKey => {
      //reset the field's value
      this.props.dispatch(change(formName, fieldKey, fieldsObj[fieldKey]));

      //reset the field's error
      this.props.dispatch(untouch(formName, fieldKey));
    });
  };

  render() {
    let members = [];
    this.props.myProps.members.map(user =>
      members.push({
        id: user.id,
        name: `${user.first_name} ${user.last_name} (${user.email})`
      })
    );

    return (
      <div className="tags">
        <label>{this.props.label}</label>{" "}
        <form className="ui form">
          <Field
            name="tag"
            component={Tags}
            tags={members}
            isLoading={this.props.isLoading}
            searchUsers={this.props.searchUsers}
            users={this.props.users}
            updateTags={this.updateTags}
            label="Email or name"
            placeholder="Email address or name"
          />
        </form>
        <></>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const selector = formValueSelector("AddLabels");

  const { boardShowGoals } = state.ui;

  return {
    tag: selector(state, "tag"), //we use this selector here to pass our input field (tag) to our props
    myProps: ownProps,
    boardShowGoals: boardShowGoals,
    labels: state.labels.labels,
    projectId: state.projects.currentProjectId,
    isLoading: state.projects.isLoading,
    users: state.projects.users
  };
};

const formWrapped = reduxForm({
  form: "AddLabels",
  enableReinitialize: true
})(InviteHandler);

export default connect(
  mapStateToProps,
  {
    createLabels,
    loadLabels,
    deleteLabels,
    updateLabel,
    loadGoals,
    searchUsers,
    inviteShortTermGoalMember
  }
)(formWrapped);
