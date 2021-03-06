import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import moment from "moment";
import { connect } from "react-redux";
import Modal from "../../../UI/Modal/Modal";
import DatePicker from "../../../UI/Datepicker";
import { toggleModal } from "../../../../actions/uiActions";
import { createGoal, loadGoals } from "../../../../actions/goalsActions";
import renderInputTextArea from "../../../UI/TextArea";
import renderInputCheckbox from "../../../UI/Checkbox";
import renderInput from "../../../UI/Input";

class AddShortTermGoalModal extends Component {
  onSubmit = formValues => {
    let formOutput = {
      ...formValues,
      column: this.props.myProps.longTermGoalId
    };

    //remove all empty fields from formOutput
    Object.keys(formOutput).forEach(key =>
      !formOutput[key] ? delete formOutput[key] : null
    );

    formOutput.optional_duration_hrs = formOutput.duration_hrs || "";
    delete formOutput.duration_hrs;

    // console.log('creating new goal ==> ');
    // console.log(formOutput);

    this.props.createGoal(formOutput).then(response => {
      if (response !== undefined) {
        if (response.status === 200 || response.status === 201) {
          this.props.loadGoals(
            this.props.currentProjectId,
            this.props.boardShowGoals
          ); //refresh goals (to display new one)
          setTimeout(() => {
            this.props.toggleModal("shortTermGoal"); //close modal once goal is created
          }, 500);
        }
      }
    });
  };

  onClose() {
    this.props.toggleModal("shortTermGoal");
  }

  render() {
    const title = "Add your short-term goal!";

    const content = (
      <React.Fragment>
        <p className="modal-subtitle">
          Short-term goals are defined in <strong>days or weeks</strong> and
          relate with your long term goal purpose.
        </p>

        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form"
        >
          <Field
            name="title"
            component={renderInput}
            label="Enter title"
            placeholder="A summary about what's your goal about"
          />
          <Field
            name="description"
            textarea={true}
            component={renderInputTextArea}
            label="Enter description"
            placeholder="Describe what you have to do in details, to accomplish it"
          />
          <Field
            name="duration_hrs"
            type="number"
            optional={true}
            component={renderInput}
            label="Estimated duration (hrs)"
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
            minDate={new Date()}
            maxDate={new Date(this.props.deadline)}
            dropdownMode="select"
            normalize={value =>
              value ? moment(value).format("YYYY-MM-DD") : null
            }
            component={DatePicker}
          />

          <Field
            name="priority"
            component={renderInputCheckbox}
            label="Is this a priority goal?"
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
          New Goal
        </button>
        <button className="ui button negative" onClick={() => this.onClose()}>
          Cancel
        </button>
      </React.Fragment>
    );

    return (
      <Modal
        name="shortTermGoal"
        title={title}
        content={content}
        actions={actions}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { boardShowGoals, modals } = state.ui;

  return {
    myProps: ownProps,
    modals: modals,
    boardShowGoals: boardShowGoals,
    currentProjectId: state.projects.currentProjectId,
    initialValues: {
      title: "",
      description: "",
      duration_hrs: "",
      deadline: "",
      priority: false
    }
  };
};

const formWrapped = reduxForm({
  form: "AddShortTermGoalModal",
  enableReinitialize: true
})(AddShortTermGoalModal);

export default connect(
  mapStateToProps,
  {
    //some actions here
    toggleModal,
    createGoal,
    loadGoals
  }
)(formWrapped);
