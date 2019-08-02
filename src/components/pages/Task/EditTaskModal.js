import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Modal from "../../UI/Modal/Modal";
import { toggleModal } from "../../../actions/uiActions";
import { createProject, loadProjects } from "../../../actions/projectActions";
import DatePicker from "../../UI/Datepicker";
import moment from "moment";
import { updateTask } from "../../../actions/taskActions";
import cogoToast from "cogo-toast";

class EditTaskModal extends Component {
  onClose() {
    this.props.toggleModal("editTaskModal");
  }

  componentDidMount() {
    console.log("rendering edit task for...");
    console.log(this.props.myProps.task);
  }

  renderInput({ input, label, meta, optional, type, textarea, placeholder }) {
    return (
      <div className="field">
        <label>{label}</label>
        {textarea ? (
          <textarea {...input} rows="3" placeholder={placeholder} />
        ) : (
          <input {...input} type={type} placeholder={placeholder} />
        )}
        {optional ? (
          <>
            <div className="ui pointing label">Optional Field</div>
          </>
        ) : null}
      </div>
    );
  }

  renderInputTextArea({ input, label, meta, optional, placeholder }) {
    return (
      <div className="field">
        <label>{label}</label>
        <textarea {...input} rows="3" placeholder={placeholder} />
        {optional ? (
          <>
            <div className="ui pointing label">Optional Field</div>
          </>
        ) : null}
      </div>
    );
  }
  renderInputCheckbox({ input, meta, optional, label, value }) {
    return (
      <div className="field">
        <div className="ui toggle checkbox">
          <input {...input} type="checkbox" />
          <label>{label}</label>
        </div>
      </div>
    );
  }

  render() {
    const title = "Edit Task";

    const content = (
      <React.Fragment>
        <p className="modal-subtitle">
          A task is an activity that you have to accomplish in order to reach or
          maintain your project goals.
        </p>

        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form"
        >
          <Field
            name="title"
            component={this.renderInput}
            label="Title"
            placeholder="Your task title"
          />

          <Field
            name="description"
            textarea={true}
            component={this.renderInputTextArea}
            label="Description"
            placeholder="Insert a small task description"
          />

          <Field
            name="deadline"
            label="Deadline"
            inputValueFormat="YYYY-MM-DD"
            // dateFormat="L"
            dateFormatCalendar="dddd"
            placeholderText="Select deadline"
            fixedHeight
            showMonthDropdown
            showYearDropdown
            currentDeadline={this.props.myProps.task.deadline}
            // minDate={new Date()}
            // maxDate={new Date(this.props.deadline)}
            dropdownMode="select"
            normalize={value =>
              value ? moment(value).format("YYYY-MM-DD") : null
            }
            component={DatePicker}
          />

          <Field
            name="priority"
            component={this.renderInputCheckbox}
            label="Is this a priority Task?"
          />
          <Field
            name="completed"
            component={this.renderInputCheckbox}
            label="Is this done?"
          />
        </form>
      </React.Fragment>
    );

    const actions = (
      <React.Fragment>
        <button
          className="ui button positive"
          onClick={this.props.handleSubmit(this.onSubmit)}
        >
          Edit Task
        </button>
        <button className="ui button negative" onClick={() => this.onClose()}>
          Cancel
        </button>
      </React.Fragment>
    );

    return (
      <Modal
        name="editTaskModal"
        title={title}
        content={content}
        actions={actions}
      />
    );
  }

  onSubmit = formValues => {
    console.log("updating tasks...");

    formValues = {
      ...formValues,
      project: this.props.currentProjectId
    };

    this.props.updateTask(this.props.myProps.task.id, formValues).then(() => {
      console.log("task updated!");
      cogoToast.success("Your task was updated successfully!");
      this.props.toggleModal("editTaskModal", this.props.myProps.task.id);
    });
  };
}

const mapStateToProps = (state, ownProps) => {
  const { modals } = state.ui;

  return {
    modals: modals,
    myProps: ownProps,
    currentProjectId: state.projects.currentProjectId,
    initialValues: {
      title: ownProps.task.title,
      description: ownProps.task.description,
      deadline: ownProps.task.deadline.split("T")[0],
      priority: ownProps.task.priority,
      completed: ownProps.task.completed
    }
  };
};

const formWrapped = reduxForm({
  form: "editTaskModal",
  enableReinitialize: true
})(EditTaskModal);

export default connect(
  mapStateToProps,
  {
    //some actions here
    toggleModal,
    createProject,
    loadProjects,
    updateTask
  }
)(formWrapped);
