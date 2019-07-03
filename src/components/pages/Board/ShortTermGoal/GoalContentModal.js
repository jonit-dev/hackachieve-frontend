import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../../../UI/Modal/Modal";
import { toggleModal } from "../../../../actions/uiActions";
import Moment from "react-moment";
import ChecklistHandler from "../../../UI/forms/ChecklistHandler";
import LabelHandler from "../../../UI/forms/LabelHandler";
import { loadGoals, editGoals } from "../../../../actions/goalsActions";
import moment from "moment";

// import Moment from "react-moment";

class GoalContentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicstatus: ""
    };
  }
  componentDidMount() {
    !this.props.myProps.shortTermGoal.is_public
      ? this.setState({ publicstatus: "Private" })
      : this.setState({ publicstatus: "Public" });
  }

  onClose() {
    this.props.toggleModal("goalContent", this.props.myProps.shortTermGoal.id);
  }

  onEdit() {
    this.props.toggleModal("goalContent", this.props.myProps.shortTermGoal.id);
    this.props.toggleModal(
      "editShortTermGoal",
      this.props.myProps.shortTermGoal.id
    );
  }

  onRenderStatus(status) {
    switch (status) {
      case 1:
        return "Pending";
      case 2:
        return "On going...";
      case 3:
        return "Done";
      default:
        return null;
    }
  }

  onChangePublicStatus() {
    let formOutput = {
      goal_id: this.props.myProps.shortTermGoal.id,
      goal_data: {
        column_id: this.props.myProps.shortTermGoal.column_id,
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
      const { status } = response.data;

      if (status === "success") {
        this.props.loadGoals(0, this.props.boardShowGoals); //refresh goals (to display new one)
        setTimeout(() => {
          this.props.toggleModal("goalContent"); //close modal once goal public status is change.
        }, 500);
      }
    });
  }

  onPublicPrivateSwitch() {
    if (this.state.publicstatus === "Public") {
      return (
        <a
          className="public"
          href="# "
          onClick={() => this.onChangePublicStatus()}
        >
          <i className="far fa-eye" />
          {this.state.publicstatus}
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
          {this.state.publicstatus}
        </a>
      );
    }
  }

  render() {
    const {
      title,
      description,
      deadline,
      status
    } = this.props.myProps.shortTermGoal;

    const content = (
      <React.Fragment>
        <div className="top-bar-popup">
          <a href="# " onClick={() => this.onEdit()}>
            <img src="/images/icons/alert-circle.svg" alt="" />
            <strong>Status: {this.onRenderStatus(status)}</strong>
          </a>
          <a href="# " onClick={() => this.onEdit()}>
            <img src="images/icons/alert-circle.svg" alt="" />
            <strong>Deadline:</strong>{" "}
            <Moment format="D MMMM, YYYY">{deadline}</Moment>
          </a>
          {/*below a tag is use to make card public or private.*/}
          {this.onPublicPrivateSwitch()}
        </div>

        {/*<div className="tags">*/}
        {/* <label>Tags</label>*/}
        {/* <a className="fitness" href="# "> Fitness</a>*/}
        {/*<a className="goal" href="# "> Personal goals</a>*/}
        {/*<a className="add-tag" href="# " > <img src="images/icons/plus.svg" alt=""/> Add</a>*/}
        {/*</div>*/}

        <LabelHandler goalId={this.props.myProps.shortTermGoal.id} />

        <div className="detail">
          <h3>Description</h3>
          <p>{description}</p>

          <ChecklistHandler />
        </div>
      </React.Fragment>
    );

    const actions = (
      <React.Fragment>
        <button className="add-task" onClick={() => this.onEdit()}>
          Edit
        </button>
        <button className="cancel" onClick={() => this.onClose()}>
          Cancel
        </button>
      </React.Fragment>
    );

    return (
      <Modal
        name="goalContent"
        title={title}
        content={content}
        actions={actions}
        userid={this.props.myProps.shortTermGoal.user_id}
        goalid={this.props.myProps.shortTermGoal.id}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    myProps: ownProps,
    modals: state.ui.modals
  };
};

export default connect(
  mapStateToProps,
  {
    //actions here
    toggleModal,
    editGoals,
    loadGoals
  }
)(GoalContentModal);
