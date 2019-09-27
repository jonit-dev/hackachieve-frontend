import React from "react";

const Attachments = props => {
  return (
    <>
      <h3 className="attachment"> Attachments</h3>
      <div className="ui list">
        {props.file.map((data, index) => (
          <div className="item" key={index}>
            <i className="file icon"></i>
            <div className="content">
              <div className="header">
                <a
                  className="item"
                  href={data.file}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.title}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Attachments;
