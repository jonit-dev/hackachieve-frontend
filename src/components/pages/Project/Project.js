import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModal } from "../../../actions/uiActions";
import { loadProjects, deleteProject } from "../../../actions/projectActions";
import Analytics from "../../../analytics/Analytics";
import AddProjectModal from "./AddProjectModal";
import { Link } from "react-router-dom";

class Project extends Component {
  componentDidMount() {
    this.props.loadProjects();
    Analytics.track("project_visit", {
      eventCategory: "pages",
      eventAction: "project_visit"
    });
  }

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

  onDeleteProject(id) {
    this.props.deleteProject(id).then(() => {
      this.props.loadProjects();
    });
  }

  render() {
    return (
      <main className="board-main">
        <div className="board-columns">
          <div className="card-container">
            {this.props.projects.map(project => (
              <Link to={`project/${project.id}/board`} key={project.id}>
                <div className="cCard">
                  <p>
                    {project.name} - {project.description}
                  </p>
                  <div
                    className="delete-btn"
                    onClick={e => {
                      e.preventDefault();
                      this.onDeleteProject(project.id);
                    }}
                  >
                    &times;
                  </div>
                  {/* <div className="favicon"></div> */}
                  <img alt="img1" src="/images/gradient.png" />
                </div>
              </Link>
            ))}
            <div
              className="cCard create-board"
              onClick={() => this.onOpenProjectModal()}
            >
              <div className="create-project-cta">Create new project</div>
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
    projects: state.projects.projects,
    modals: state.ui.modals
  };
};

export default connect(
  mapStateToProps,
  {
    //actions here
    loadProjects,
    toggleModal,
    deleteProject
  }
)(Project);
