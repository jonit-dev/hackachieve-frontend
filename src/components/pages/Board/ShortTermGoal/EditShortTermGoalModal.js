import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Modal from "../../../UI/Modal/Modal";
import {toggleModal} from "../../../../actions/uiActions";
import {createGoal, loadGoals} from "../../../../actions/goalsActions";

class EditShortTermGoalModal extends Component {

    onClose() {
        this.props.toggleModal('editShortTermGoal');
    }

    renderInput({input, label, meta, optional, type, textarea, placeholder}) {
        return (
            <div className="field">
                <label>{label}</label>
                {(textarea ? <textarea {...input} rows="3" placeholder={placeholder}/> :
                    <input {...input} type={type} placeholder={placeholder}/>)}
                {(optional ? <>
                    <div className="ui pointing label">
                        Optional Field
                    </div>
                </> : null)}


            </div>
        )
    }

    renderInputTextArea({input, label, meta, optional, placeholder, value}) {
        return (
            <div className="field">
                <label>{label}</label>
                <textarea {...input} rows="3" placeholder={placeholder}/>
                {(optional ? <>
                    <div className="ui pointing label">
                        Optional Field
                    </div>
                </> : null)}
            </div>
        )
    }

    renderInputCheckbox({input, meta, optional, label, value}) {
        return (
            <div className="field">
                <div className="ui toggle checkbox">
                    <input {...input} type="checkbox"/>
                    <label>{label}</label>
                </div>
            </div>
        )
    }

    render() {
        const title = 'Edit your short-term goal!';

        const content = <React.Fragment>

            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                <Field name="title" component={this.renderInput} label="Enter title"
                       placeholder="A summary about what's your goal about" value={this.props.myProps.shortTermGoal.title}/>
                <Field name="description" textarea={true} component={this.renderInputTextArea} label="Enter description"
                       placeholder="Describe what you have to do in details, to accomplish it"/>
                <Field name="duration_hrs" type="number" optional={true} component={this.renderInput}
                       label="Estimated duration (hrs)"/>
                <Field name="deadline" type="date" component={this.renderInput}
                       label="Deadline"/>
                <Field name="priority" component={this.renderInputCheckbox}
                       label="Is this a priority goal?"/>
            </form>
        </React.Fragment>;


        const actions = <React.Fragment>
            <button className="ui button positive" onClick={this.props.handleSubmit(this.onSubmit)}>Update</button>
            <button className="ui button negative" onClick={() => this.onClose()}>Cancel</button>
        </React.Fragment>;

        return (
            <Modal name='editShortTermGoal' title={title} content={content} actions={actions}/>
        );
    }


    onSubmit = (formValues) => {

        let formOutput = {...formValues, column_id: this.props.myProps.longTermGoalId};

        // console.log('creating new goal ==> ');
        // console.log(formOutput);

        this.props.createGoal(formOutput).then((response) => {

            const {status} = response.data;

            if (status === 'success') {

                this.props.loadGoals(0, this.props.boardShowGoals); //refresh goals (to display new one)

                setTimeout(() => {
                    this.props.toggleModal('editShortTermGoal'); //close modal once goal is created
                }, 2000)

            }


        });

    };
}


const mapStateToProps = (state, ownProps) => {

    const {boardShowGoals, modals} = state.ui;
    return {
        myProps: ownProps,
        modals: modals,
        boardShowGoals: boardShowGoals,
        initialValues: {
            title: ownProps.shortTermGoal.title,
            description: ownProps.shortTermGoal.description,
            duration_hrs: ownProps.shortTermGoal.duration_hrs,
            deadline: ownProps.shortTermGoal.deadline.split('T')[0],
            priority: ownProps.shortTermGoal.priority
        }
    };
};

const formWrapped = reduxForm({
    form: 'EditShortTermGoalModal',
    enableReinitialize: true
})(EditShortTermGoalModal);

export default connect(mapStateToProps, {
    //some actions here
    toggleModal,
    createGoal,
    loadGoals
})(formWrapped)
