import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Modal from "../../UI/InviteModal/InviteModal";
import Tags from "../../UI/forms/Tags";
import { toggleModal } from "../../../actions/uiActions";

import {
    searchUsers,
    inviteMember,
    setCurrentProject
} from "../../../actions/projectActions";



class InviteMemberModal extends Component {
    state = {
        tags:[]
      };

    updateTags = tags => {
        this.setState({
            tags
        });
    };


    renderInputTextArea({ input, label, meta, optional, placeholder }) {
        return (
            <div className="field">
                <textarea {...input} rows="3" placeholder={placeholder} />
            </div>
        )
    }

    render() {
        let members=[];
        this.props.currentProject.member.map((user) =>
        members.push({
            id: user.id,
            name: user.email
        })
        )

        const title = 'Invite To Board';

        const content = <React.Fragment>
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                <Field name="name" tags={members} component={Tags} isLoading={this.props.isLoading} searchUsers={this.props.searchUsers} users={this.props.users} updateTags={this.updateTags} label="Email or name"
                    placeholder="Email address or name" />

                <Field name="description" textarea={true} component={this.renderInputTextArea}
                    label="description"
                    placeholder="Sharing is caring, let your collaborators know what you're working on" />
            </form>
        </React.Fragment>;


        const actions = <React.Fragment>
            <button className="ui large button positive" onClick={this.props.handleSubmit(this.onSubmit)}>Send invitation</button>
        </React.Fragment>;

        const footer = <React.Fragment>

            <div className="footer-header-section">
                <p><span></span>Invite with Link</p>
                <a href="#/">Create Link</a>
            </div>
            <p>anyone with link can join as board member</p>

        </React.Fragment>;

        return (
            <Modal name='inviteMember' footer={footer} title={title} content={content} actions={actions} />
        );
    }

    onSubmit = formValues => {
        let formOutput = { ...formValues };
        let members = [];
        this.state.tags.map(member => members.push({ id: member.id }));
        const invitePayload = {
            name: this.props.currentProject.name,
            description: formOutput.description,
            member: members
        };
        this.props
            .inviteMember(this.props.currentProjectId, invitePayload)
            .then(response => {
                this.props.setCurrentProject(this.props.currentProjectId); //refresh projects (to display new one)
                setTimeout(() => {
                    this.props.toggleModal("inviteMember"); //close modal once project is created
                }, 500);
            });
    };

}

const mapStateToProps = (state, ownProps) => {
    return {
        users: state.projects.users,
        currentProjectId: state.projects.currentProjectId,
        currentProject: state.projects.currentProject,
        isLoading: state.projects.isLoading,
        initialValues: {
            name: '',
            description: ''
        }
    };
};

const formWrapped = reduxForm({
    form: 'InviteMemberModal',
    enableReinitialize: true
})(InviteMemberModal);

export default connect(mapStateToProps, {
    //some actions here
    toggleModal,
    searchUsers,
    inviteMember,
    setCurrentProject
})(formWrapped)