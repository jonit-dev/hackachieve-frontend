import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../../../UI/Modal/Modal";
import { toggleModal } from "../../../../actions/uiActions";
import _ from "lodash";
import LabelHandler from "../../../UI/forms/LabelHandler";
import InviteHandler from "../../../UI/forms/InviteHandler";
import {
  loadGoals,
  editGoals,
  uploadFile,
  attachFileToGoal,
  clearFileUpload,
  clearAttachFileUpload
} from "../../../../actions/goalsActions";
import cogoToast from "cogo-toast";
import {
  loadComments,
  CreateComment,
  UserInfo,
  DeleteComments,
  UpdateComments,
  CommentsVote
} from "../../../../actions/commentAction";
import UploadFile from "../../../UI/Modal/UploadFile";
import Attachments from "../../../UI/Modal/Attachments";
import Description from "../../../UI/Modal/Description";
import GrayPills from "../../../UI/Modal/GrayPills";

class GoalContentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CommentsTxt: "",
      UpdateBox: false,
      CommentDT: [],
      LoginUser: []
    };
    this.handleCreateChange = this.handleCreateChange.bind(this);
    this.handleUpdateChange = this.handleUpdateChange.bind(this);
  }
  componentDidMount() {
    UserInfo().then(response => {
      this.setState({ LoginUser: response });
      this.loadcomment();
    });
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

  //############### comment related functions #################
  loadcomment() {
    if (this.props.myProps.shortTermGoal.id) {
      loadComments(this.props.myProps.shortTermGoal.id).then(response => {
        this.setState({ CommentDT: response });
      });
    }
  }

  handleCreateChange(event) {
    this.setState({ CommentsTxt: event.target.value });
  }

  handleUpdateChange(event) {
    this.setState({ commentupdatedtext: event.target.value });
  }

  AddComments() {
    if (!this.state.CommentsTxt) {
      cogoToast.error("Please write some comment first");
    } else {
      let commentdata = {
        text: this.state.CommentsTxt,
        vote: "0",
        goal: this.props.myProps.shortTermGoal.id
      };

      CreateComment(commentdata).then(response => {
        this.setState({ CommentsTxt: "" });
        this.loadcomment();
      });
    }
  }

  DeleteComments(commentid) {
    DeleteComments(commentid).then(response => {
      this.loadcomment();
    });
  }
  UpdateCommentsbox(commentid, commenttext) {
    this.setState({
      UpdateBox: true,
      Comment_id: commentid,
      commentupdatedtext: commenttext
    });
  }

  UpdateComment(id) {
    let updated = {
      text: this.state.commentupdatedtext
    };
    UpdateComments(id, updated).then(response => {
      this.setState({ UpdateBox: false });
      this.loadcomment();
    });
  }
  UpvoteComments(commentid) {
    let vote = {
      upvote: "1",
      downvote: "0",
      comment: commentid
    };
    this.props.CommentsVote(vote).then(response => {
      this.loadcomment();
    });
  }
  DownvoteComments(commentid) {
    let vote = {
      upvote: "0",
      downvote: "1",
      comment: commentid
    };
    this.props.CommentsVote(vote).then(response => {
      this.loadcomment();
    });
  }

  render() {
    const {
      title,
      description,
      deadline,
      status,
      member,
      file
    } = this.props.myProps.shortTermGoal;

    const { UpdateBox, Comment_id } = this.state;
    const commentcontent = (
      <React.Fragment>
        <div className="comment-sec">
          <h3>
            Goal comments ({this.state.CommentDT.length})
            <img src="/images/icons/chevron-up.svg" alt="vote up" />
          </h3>
          <ul>
            {this.state.CommentDT.map((comment, i) => (
              <div className="comment-sec" key={comment.id}>
                {/* {console.log(comment.voting[0])} */}
                <div className="cooment-left">
                  <a
                    href="# "
                    onClick={() => this.UpvoteComments(comment.id)}
                    className="up-arrow"
                  >
                    <img src="/images/icons/chevron-up.svg" alt="vote up" />
                  </a>
                  {comment.voting[0] === undefined ? (
                    <span className="count">{0}</span>
                  ) : (
                    <span className="count">
                      {comment.voting[0].upvote - comment.voting[0].downvote}
                    </span>
                  )}
                  <a
                    href="# "
                    onClick={() => this.DownvoteComments(comment.id)}
                    className="down-arrow"
                  >
                    <img src="/images/icons/chevron-up.svg" alt="vote up" />
                  </a>
                </div>
                <div className="cooment-right">
                  <div className="comment-client">
                    <img
                      src="/images/icons/avatar-generic.svg"
                      alt="user avatar"
                    />
                    <h4>
                      {comment.user.first_name + " " + comment.user.last_name}
                    </h4>
                    <span className="time">13:00 PM</span>
                  </div>
                  <div
                    className="client-text"
                    style={{
                      display:
                        UpdateBox === true && comment.id === Comment_id
                          ? "none"
                          : "block"
                    }}
                  >
                    <p>{comment.text}</p>
                  </div>
                  {_.isEqual(comment.user, this.state.LoginUser) ? (
                    <div>
                      <div style={{ float: "right" }}>
                        <button
                          className="cancel"
                          onClick={() => this.DeleteComments(comment.id)}
                        >
                          Delete
                        </button>{" "}
                        <button
                          style={{ margin: "0px" }}
                          className="add-task"
                          onClick={() =>
                            this.UpdateCommentsbox(comment.id, comment.text)
                          }
                        >
                          Update
                        </button>
                      </div>
                      <div
                        style={{
                          display:
                            UpdateBox === true && comment.id === Comment_id
                              ? "block"
                              : "none"
                        }}
                      >
                        <textarea
                          style={{ width: "70%", borderRadius: "20px" }}
                          value={this.state.commentupdatedtext}
                          onChange={this.handleUpdateChange}
                          className="textarea"
                        />
                        <button
                          className="add-task"
                          onClick={() => this.UpdateComment(comment.id)}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </ul>
          <div className="leave-comment">
            <div className="send-user">
              <img src="/images/icons/avatar-generic.svg" alt="user avatar" />
            </div>
            <div className="comment-box">
              <textarea
                className="textarea"
                placeholder="Comment Here"
                value={this.state.CommentsTxt}
                onChange={this.handleCreateChange}
              />
              <a
                className="send-mesage"
                href="# "
                onClick={() => this.AddComments()}
              >
                <img alt="post comment" src="/images/icons/send.svg" />
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
    const content = (
      <React.Fragment>
        <div className="top-bar-popup">
          <div className="top-bar-gray-pills">
            <GrayPills
              status={status}
              deadline={deadline}
              onEdit={() => this.onEdit()}
            />
          </div>

          {/*below a tag is use to make card public or private.*/}
          {/* <PublicPrivateSwitch
            shortTermGoal={this.props.myProps.shortTermGoal}
          /> */}

          <UploadFile
            fileInput={this.fileInput}
            goalId={this.props.myProps.shortTermGoal.id}
          />
        </div>

        <LabelHandler
          label="Tags"
          goalId={this.props.myProps.shortTermGoal.id}
        />
        <InviteHandler
          label="Add members to card"
          goalId={this.props.myProps.shortTermGoal.id}
          members={member}
        />

        <Description description={description} />

        {file.length > 0 && <Attachments file={file} />}
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
        comment={commentcontent}
        actions={actions}
        fileUploadingStatus={this.props.fileUploadingStatus}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    myProps: ownProps,
    modals: state.ui.modals,
    boardShowGoals: state.ui.boardShowGoals,
    currentProjectId: state.projects.currentProjectId,
    file: state.goal.uploadFile,
    type: state.goal.type,
    fileUploadingStatus: state.goal.fileUploadingStatus
  };
};

export default connect(
  mapStateToProps,
  {
    toggleModal,
    editGoals,
    loadGoals,
    CreateComment,
    loadComments,
    UserInfo,
    DeleteComments,
    UpdateComments,
    CommentsVote,
    uploadFile,
    attachFileToGoal,
    clearFileUpload,
    clearAttachFileUpload
  }
)(GoalContentModal);
