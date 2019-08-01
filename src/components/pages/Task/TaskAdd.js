import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createTask } from "../../../actions/taskActions";

class TaskAdd extends Component {
  renderInput({ input, placeholder, meta }) {
    return (
      <div className="field">
        <input {...input} placeholder={placeholder} />
      </div>
    );
  }

  onSubmit = formValues => {
    console.log("creating new task");
    console.log(formValues);
    this.props.createTask(this.props.currentProjectId, formValues);
  };
  onHandleKeyDown(e) {
    if (e.key === "Enter") {
      this.props.handleSubmit(this.onSubmit);
    }
  }

  render() {
    return (
      <div className="task-add">
        <i
          className="fas fa-plus"
          onClick={this.props.handleSubmit(this.onSubmit)}
        ></i>

        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            onKeyDown={e => this.onHandleKeyDown(e)}
            name="title"
            component={this.renderInput}
            className="task-add-input"
            placeholder="Add your task..."
          />
        </form>

        <div className="task-add-input"></div>
      </div>
    );
  }
}
const validate = formValues => {
  const errors = {};
  if (!formValues.field1) {
    errors.field1 = "You must enter a field1";
  }
  if (!formValues.field2) {
    errors.field2 = "You must enter a field2";
  }
  return errors;
};

const mapStateToProps = state => {
  return {
    currentProjectId: state.projects.currentProjectId
  };
};

const formWrapped = reduxForm({
  form: "TaskAdd",
  validate: validate
})(TaskAdd);

export default connect(
  mapStateToProps,
  {
    createTask
  }
)(formWrapped);
