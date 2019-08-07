import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Modal from "../../UI/Modal/Modal";
import { toggleModal } from "../../../actions/uiActions";
import { createProject, loadProjects } from "../../../actions/projectActions";

class AddProjectModal extends Component {
  onClose() {
    this.props.toggleModal("addProject");
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

  render() {
    const title = "Add New Project";

    const content = (
      <React.Fragment>
        <p className="modal-subtitle">
          It's a endeavor undertaken to create a unique product, service or even
          a personal result
        </p>

        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form"
        >
          <Field
            name="name"
            component={this.renderInput}
            label="Enter your project name"
            placeholder="A summary about what's your project about"
          />

          <div className="project-image-wrapper">
            <img
              src="/images/project.svg"
              alt="project kickstart svg"
              className="project-image"
            />
          </div>
        </form>
      </React.Fragment>
    );

    const actions = (
      <React.Fragment>
        <button
          className="ui button positive"
          onClick={this.props.handleSubmit(this.onSubmit)}
        >
          New Project
        </button>
        <button className="ui button negative" onClick={() => this.onClose()}>
          Cancel
        </button>
      </React.Fragment>
    );

    return (
      <Modal
        name="addProject"
        title={title}
        content={content}
        actions={actions}
      />
    );
  }

  onSubmit = formValues => {
    let formOutput = {
      ...formValues,
      description: "..."
    };
    this.props.createProject(formOutput).then(response => {
      if (response.status === "success") {
        this.props.loadProjects(); //refresh projects (to display new one)
        setTimeout(() => {
          this.props.toggleModal("addProject"); //close modal once project is created
        }, 500);
      }
    });
  };
}

const mapStateToProps = (state, ownProps) => {
  const { modals } = state.ui;

  return {
    modals: modals,
    initialValues: {
      name: ""
    }
  };
};

const formWrapped = reduxForm({
  form: "AddProjectModal",
  enableReinitialize: true
})(AddProjectModal);

export default connect(
  mapStateToProps,
  {
    //some actions here
    toggleModal,
    createProject,
    loadProjects
  }
)(formWrapped);
