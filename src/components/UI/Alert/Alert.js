import React, { Component } from "react";
import { connect } from "react-redux";
import { clearAlert } from "../../../actions/uiActions";

class Alert extends Component {
  componentDidMount() {
    //set time out to auto clear message
    window.setTimeout(() => {
      this.props.clearAlert();
    }, 6000);
  }

  onRenderContent(content) {
    if (typeof content === "string") {
      return content;
    } else if (typeof content === "object") {
      //if we have a single message, just render it

      if (content.message) {
        return content.message;
      } else {
        //else, we probably have to render an array...

        const kv = Object.entries(content).map(([key, value]) => ({
          key,
          value
        }));

        return (
          <ul className="alert-list">
            {kv.map(item => {
              return (
                <li key={item.key}>
                  <strong>{item.key}</strong>:{" "}
                  {item.value.length > 1 ? item.value.join(" ") : item.value}
                </li>
              );
            })}
          </ul>
        );
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className={`ui ${this.props.alert.type} message`}>
          <i className="close icon"></i>
          <div className="header">{this.props.alert.title}</div>
          {this.onRenderContent(this.props.alert.content)}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { alert: state.alert.message };
};

export default connect(
  mapStateToProps,
  {
    clearAlert
  }
)(Alert);
