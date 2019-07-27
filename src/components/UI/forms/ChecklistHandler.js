import React, { Component } from "react";

import { connect } from "react-redux";
import CheckList from "./CheckList";
import {
  checklistChangeStatus,
  checklistDeleteItem,
  checklistFetchItem
} from "../../../actions/checkListAction";

class ChecklistHandler extends Component {
  state = {
    showChecklistForm: false,
    //status: true,
    editChecklist: ""
  };
  handleClick = () => {
    this.setState({
      showChecklistForm: !this.state.showChecklistForm,
      editChecklist: ""
    });
  };
  closeForm = closeForm => {
    this.setState({
      showChecklistForm: closeForm,
      editChecklist: ""
    });
  };

  editChecklist(id = "") {
    this.setState({
      editChecklist: id ? id : "",
      showChecklistForm: false
    });
  }

  componentDidMount() {
    this.props.checklistFetchItem(this.props.modals.goalContent.id); //fetch checklist from specific goal ID
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //this checks if new items were added. If so, close the textarea
    if (prevProps.items.length !== this.props.items.length) {
      this.editChecklist();
    }
  }

  changeStatus = item => {
    this.props.checklistChangeStatus(item);
  };
  deleteItem = item => {
    this.props.checklistDeleteItem(item);
  };

  hideForm = () => {
    this.setState({
      editChecklist: ""
    });
  };

  render() {
    return (
      <div className="checklist">
        <h3>Checklist</h3>

        {this.props.items.length === 0 ? (
          <p className="checklist-warning">
            Click on "Add" to create your checklist
          </p>
        ) : null}

        {this.props.items &&
          // eslint-disable-next-line
          this.props.items.map(item => {
            if (item.id) {
              return (
                <div className="checklist-item" key={item.id}>
                  <div className="ui checkbox">
                    {this.state.editChecklist === item.id ? (
                      <>
                        <CheckList
                          goal_id={this.props.modals.goalContent.id}
                          item={item}
                          hideForm={this.hideForm}
                        />
                        <i
                          className="edit icon"
                          onClick={() => this.editChecklist()}
                        >
                          {" "}
                        </i>{" "}
                      </>
                    ) : (
                      <>
                        <label
                          className="check-main"
                          style={
                            item.status
                              ? { textDecoration: "line-through" }
                              : {}
                          }
                        >
                          <span onClick={() => this.editChecklist(item.id)}>
                            {item.description}
                          </span>
                          <input
                            type="checkbox"
                            name="example"
                            onClick={() => this.changeStatus(item)}
                            defaultChecked={item.status}
                          />
                          <span className="checkmark"></span>
                        </label>
                        <i
                          className="close icon"
                          onClick={() => this.deleteItem(item)}
                        >
                          {" "}
                        </i>{" "}
                      </>
                    )}
                  </div>
                </div>
              );
            }
          })}

        <div className="checklist-action-area">
          {!this.state.showChecklistForm && (
            <a className="add-task" href="# " onClick={this.handleClick}>
              <img src="/images/icons/plus-white.svg" alt="new task" /> New Task
            </a>
          )}
          {this.state.showChecklistForm && (
            <div>
              <CheckList
                goal_id={this.props.modals.goalContent.id}
                showChecklistForm={this.state.showChecklistForm}
                closeForm={this.closeForm}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    myProps: ownProps,
    modals: state.ui.modals,
    //checklist
    items: state.checklist.items,
    checklist: state.checklist
  };
};

export default connect(
  mapStateToProps,
  {
    //actions here
    checklistFetchItem,
    checklistChangeStatus,
    checklistDeleteItem
  }
)(ChecklistHandler);
