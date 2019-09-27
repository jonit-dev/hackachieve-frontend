import React from "react";
import ChecklistHandler from "../forms/ChecklistHandler";
import Linkify from "react-linkify/dist/components/Linkify";

const Description = props => {
  return (
    <>
      <div className="detail">
        <div className="goal-description">
          <h3>Description</h3>
          <p onClick={() => this.onEdit()}>
            {props.description ? (
              <Linkify>{props.description}</Linkify>
            ) : (
              "Click to set your card description..."
            )}
          </p>
        </div>

        <ChecklistHandler />
      </div>
    </>
  );
};
export default Description;
