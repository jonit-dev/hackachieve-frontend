import React, { Component } from "react";
import Moment from "react-moment";

class GrayPills extends Component {
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

  onRenderStatusIcon(status) {
    switch (status) {
      case 1:
        return <i className="fas fa-circle pending-status"></i>;
      case 2:
        return <i className="fas fa-circle on-going-status"></i>;
      case 3:
        return <i className="fas fa-circle complete-status"></i>;
      default:
        return <i className="fas fa-circle pending-status"></i>;
    }
  }

  render() {
    return (
      <>
        <a href="# " onClick={() => this.props.onEdit()}>
          <strong>
            Status: {this.onRenderStatus(this.props.status)}{" "}
            <span className="status-icon">
              {this.onRenderStatusIcon(this.props.status)}
            </span>
          </strong>
        </a>
        <a href="# " onClick={() => this.props.onEdit()}>
          <i className="far fa-calendar-alt"></i>
          <strong>Deadline:</strong>{" "}
          {this.props.deadline ? (
            <Moment format="D MMMM, YYYY">{this.props.deadline}</Moment>
          ) : (
            "No deadline set"
          )}
        </a>
      </>
    );
  }
}

export default GrayPills;
