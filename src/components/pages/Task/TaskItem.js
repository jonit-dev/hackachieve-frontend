import React from "react";
import Text from "../../../classes/Text";
import moment from "moment";

const TaskItem = props => {
  const {
    title,
    completed,
    checklist,
    deadline,
    description,
    priority
  } = props;

  return (
    <>
      <div
        className={
          completed
            ? `task-item done ${priority ? "priority" : ""}`
            : `task-item ${priority ? "priority" : ""}`
        }
      >
        <div className={completed ? "task-check completed" : "task-check"}>
          <i className="far fa-check-circle"></i>
        </div>
        <div className="task-description">
          <span className={completed ? "strike" : ""}>
            <strong>{Text.capitalizeFirstLetter(title)}: </strong>
            {description}
          </span>

          <div className="task-deadline">
            <i className="far fa-calendar-alt"></i>
            {moment(deadline.split("T")[0]).format("D MMMM, YY")}
          </div>
          <div className="task-delete">
            <i className="fas fa-trash-alt"></i>
          </div>
        </div>
      </div>
    </>
  );
};
export default TaskItem;
