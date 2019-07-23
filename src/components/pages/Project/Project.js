import React, { Component } from "react";
import { connect } from "react-redux";
import {
  toggleModal
} from "../../../actions/uiActions";
import AddProjectModal from "./AddProjectModal";

class Project extends Component {

  onRenderProjectModal() {
    if (
      this.props.modals.addProject.status === true &&
      !this.props.modals.addProject.id
    ) {
      //when there's not id, the board component is the one responsible for opening the modal.
      return <AddProjectModal />;
    } else {
      return null;
    }
  }

  onOpenProjectModal() {
    this.props.toggleModal("addProject"); //toggle a specific modal by triggering this action
  }



  render() {
    return (
      <main className="board-main">
        <div className="board-columns">
          <div className="card-container">
            <div className="cCard">
              <p>Express Entry: Sprint1 <span></span> 01/06/18>...</p>
              <div className="favicon"></div>
              <img alt="img1" src="https://loremflickr.com/640/360" />
            </div>
            <div className="cCard">
              <p>Life - Strategic Goals: Sprint <span></span></p>
              <div className="favicon"></div>
              <img alt="img2" src="https://loremflickr.com/640/360" />
            </div>
            <div className="cCard create-board" onClick={() => this.onOpenProjectModal()}>
              <div>Create new board</div>
            </div>
          </div>
        </div>
        {this.onRenderProjectModal()}
      </main>
    );
  }
}


const mapStateToProps = state => {
  return {
    modals: state.ui.modals,
  };
};

export default connect(
  mapStateToProps,
  {
    //actions here
    toggleModal,
  }
)(Project);
