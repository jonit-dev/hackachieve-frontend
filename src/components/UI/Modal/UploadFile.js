import React, { Component } from "react";

import { connect } from "react-redux";
import {
  loadGoals,
  attachFileToGoal,
  clearAttachFileUpload,
  uploadFile
} from "../../../actions/goalsActions";

class UploadFile extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.type === "FILE_UPLOAD_SUCCESS") {
        const goalId = this.props.myProps.goalId;
        const payload = {
          file: [{ id: nextProps.file.id }]
        };
        this.props.attachFileToGoal(goalId, payload);
      }

      if (nextProps.type === "ATTACH_UPLOAD_SUCCESS") {
        console.log("ATTACH_UPLOAD_SUCCESS");
        this.props.clearAttachFileUpload();
        this.props.loadGoals(
          this.props.currentProjectId,
          this.props.boardShowGoals
        );
      }
    }
  }

  handleFileinputChange = () => {
    const file = this.fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);
    formData.append("title", file.name);
    this.props.uploadFile(formData);
  };

  render() {
    return (
      <>
        <label className="fluid segment">
          <input
            type="file"
            className="inputfile"
            id="embedpollfileinput"
            ref={fileInput => (this.fileInput = fileInput)}
            key="fileInput"
            onChange={this.handleFileinputChange}
          />
          <label
            htmlFor="embedpollfileinput"
            className="ui fileuploader right floated button"
          >
            <i className="ui upload icon"></i>
            Upload File
          </label>
        </label>
      </>
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
    loadGoals,
    attachFileToGoal,
    clearAttachFileUpload,
    uploadFile
  }
)(UploadFile);
