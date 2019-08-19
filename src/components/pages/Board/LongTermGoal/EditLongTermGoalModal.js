import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import moment from "moment";
import DatePicker from "../../../UI/Datepicker";
import Modal from "../../../UI/Modal/Modal";
import { toggleModal } from "../../../../actions/uiActions";
import {
  createLongTermGoal,
  loadGoals,
  loadUserGoalsCategories,
  editColumns,
  createNewCategory,
  deleteNewCategory
} from "../../../../actions/goalsActions";
import {
  searchUsers,
  inviteLongTermGoalMember
} from "../../../../actions/projectActions";
import Loading from "../../../UI/Loading/Loading";
import { CategorySelector } from "./CategorySelector";
import Tags from "../../../UI/forms/Tags";

class EditLongTermGoalModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelectableValue: {
        id: 0,
        value: ""
      }
    };
  }

  updateTags = tags => {
    let members = [];
    tags.map(member => members.push({ id: member.id }));
    const { id } = this.props.myProps.longTermGoal;
    const invitePayload = {
      member: members
    };

    this.props.inviteLongTermGoalMember(id, invitePayload).then(response => {
      this.props.loadGoals(
        this.props.currentProjectId,
        this.props.boardShowGoals
      );
    });
  };

  componentDidMount() {
    this.onLoadBoardCategories();
  }

  onLoadBoardCategories() {
    return this.props
      .loadUserGoalsCategories(this.props.currentProjectId)
      .then(() => {
        //set first option as selected

        console.log("loading board categories");

        const boardName = this.props.myProps.longTermGoal.boardName;
        const boardCategory = this.props.boardCategories.find(
          category => category.name === boardName
        );

        //set current selected option on state, after loading current categories
        this.setState(
          {
            currentSelectableValue: {
              id: boardCategory.id,
              label: boardCategory.name
            }
          },
          () => {
            console.log(this.state);
          }
        );
      });
  }

  onClose() {
    this.props.toggleModal("editLongTermGoal");
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

  renderInputCheckbox({ input, meta, optional, label }) {
    return (
      <div className="field">
        <div className="ui toggle checkbox">
          <input {...input} type="checkbox" />
          <label>{label}</label>
        </div>
      </div>
    );
  }

  onRenderBoardOptions() {
    //return this.props.boardCategories.map((category) => <option key={category.id}
    //                                                            value={category.id}>{category.name}</option>);
    return this.props.boardCategories.map(category => ({
      value: "" + category.id,
      label: "" + category.name
    }));
  }

  renderInputSelectBoards({ input, meta, optional, label, children }) {
    return (
      <div className="field">
        <label>{label}</label>
        <select {...input}>{children}</select>
      </div>
    );
  }

  handleCategorySelection(data) {
    const { value, label } = data;
    let board_id = parseInt(value);
    console.log("handleCategorySelection()");

    switch (data.action) {
      case "clear":
        this.setState({
          currentSelectableValue: null
        });
        break;

      case "select-option":
        //set current selected option on state
        this.setState(
          {
            currentSelectableValue: {
              id: board_id,
              label: label
            }
          },
          () => {
            console.log(this.state);
          }
        );

        break;

      case "create-option":
        this.props.createNewCategory(value).then(response => {
          // let {currentSelectableValue} = this.state;
          console.log(response);

          this.onLoadBoardCategories().then(() => {
            //refresh board categories, with new one

            //find the recently added category
            let newCategory = this.props.boardCategories.find(
              category => category.name === label
            );

            //set category on component level state (it will be used on submit - formValues)
            this.setState({
              currentSelectableValue: {
                id: newCategory.id,
                label: newCategory.name
              }
            });
          });
        });
        break;

      default:
        break;
    }
  }

  renderInputInviteMember(props) {
    return (
      <div className="field">
        <label>{props.label}</label>
        <Tags {...props} />
      </div>
    );
  }

  render() {
    const { member } = this.props.myProps.longTermGoal;
    let members = [];
    member.map(user =>
      members.push({
        id: user.id,
        name: `${user.first_name} ${user.last_name}:${user.email}`
      })
    );

    const title = "Edit your Long Term goal!";

    const content = (
      <React.Fragment>
        <p className="modal-subtitle">
          A long-term goal is something you want to do in the future, for
          example, in the next 3 months.
        </p>
        cards
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form"
        >
          <Field
            name="name"
            component={this.renderInput}
            label="Enter a long term goal title"
            placeholder="A summary about what's your goal about"
          />

          <Field
            name="description"
            textarea={true}
            component={this.renderInputTextArea}
            label="Enter your long term goal description"
            placeholder="Describe what you have to do in details, to accomplish it"
          />

          {/* <Field name="board_id" component={this.renderInputSelectBoards}
                       label="Category">
                    {this.props.boardCategories ? this.onRenderBoardOptions() : <Loading/>}
                </Field> */}

          {this.props.boardCategories ? (
            <Field
              name="board_id"
              label="Category"
              selectedOption={
                this.state.currentSelectableValue
                  ? this.state.currentSelectableValue
                  : null
              }
              component={CategorySelector}
              options={this.onRenderBoardOptions()}
              onChange={(data, actions) => {
                console.log("CategorySelector:");
                console.log(actions);
                console.log(data);

                if (data) {
                  //make sure its not null
                  this.handleCategorySelection(data, actions);
                }
                // this.onLoadBoardCategories(); //refresh board categories
              }}
            />
          ) : (
            <Loading />
          )}

          <Field
            name="name"
            tags={members}
            component={this.renderInputInviteMember}
            isLoading={this.props.isLoading}
            searchUsers={this.props.searchUsers}
            users={this.props.users}
            updateTags={this.updateTags}
            label="Edit member to your long term goal"
            placeholder="Email address or name"
          />

          <Field
            name="deadline"
            label="Deadline"
            inputValueFormat="YYYY-MM-DD"
            // dateFormat="L"
            currentDeadline={this.props.myProps.longTermGoal.deadline}
            dateFormatCalendar="MMMM"
            placeholderText="Select deadline"
            fixedHeight
            showMonthDropdown
            showYearDropdown
            scrollableYearDropdown
            minDate={new Date()}
            // maxDate={new Date(this.props.deadline)}
            // dropdownMode="select"
            normalize={value =>
              value ? moment(value).format("YYYY-MM-DD") : null
            }
            component={DatePicker}
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
          Update
        </button>
        <button className="ui button negative" onClick={() => this.onClose()}>
          Cancel
        </button>
      </React.Fragment>
    );

    return (
      <Modal
        name="editLongTermGoal"
        title={title}
        content={content}
        actions={actions}
      />
    );
  }

  onSubmit = formValues => {
    console.log(this.props);
    let formOutput = {
      column_data: {
        ...formValues
      },
      column: this.props.myProps.longTermGoal.id
    };

    formOutput.column_data.board_id = this.state.currentSelectableValue.id; //get category id

    this.props.editColumns(formOutput).then(response => {
      const { status } = response.data;

      if (status === "success") {
        this.props
          .loadGoals(this.props.currentProjectId, this.props.boardShowGoals)
          .then(() => {
            window.setTimeout(() => {
              //this timeout is to avoid triggering a togglemodal before updating the state on load the selected category
              this.props.toggleModal("editLongTermGoal"); //close modal once goal is created
            }, 500);
          }); //refresh goals (to display new one)
      }
    });
  };
}

const mapStateToProps = (state, ownProps) => {
  const { modals, boardCategories, boardShowGoals } = state.ui;

  return {
    myProps: ownProps,
    modals: modals,
    boardShowGoals: boardShowGoals,
    boardCategories: boardCategories,
    currentProjectId: state.projects.currentProjectId,
    users: state.projects.users,
    isLoading: state.projects.isLoading,
    initialValues: {
      name: ownProps.longTermGoal.title,
      description: ownProps.longTermGoal.description,
      deadline: ownProps.deadline
        ? ownProps.longTermGoal.deadline.split("T")[0]
        : ""
      //board id is set on componentDidMount
    }
  };
};

const formWrapped = reduxForm({
  form: "EditLongTermGoalModal",
  enableReinitialize: true
})(EditLongTermGoalModal);

export default connect(
  mapStateToProps,
  {
    //some actions here
    toggleModal,
    createLongTermGoal,
    loadGoals,
    loadUserGoalsCategories,
    editColumns,
    createNewCategory, // This is for creating new category
    deleteNewCategory,
    searchUsers,
    inviteLongTermGoalMember
  }
)(formWrapped);
