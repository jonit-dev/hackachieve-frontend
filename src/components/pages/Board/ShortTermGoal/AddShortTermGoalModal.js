import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Modal from "../../../UI/Modal/Modal";
import {toggleModal} from "../../../../actions/uiActions";
import {createGoal, loadGoals} from "../../../../actions/goalsActions";
import renderInputTextArea from '../../../UI/TextArea';
import renderInputCheckbox from '../../../UI/Checkbox';
import renderInput from '../../../UI/Input';
class AddShortTermGoalModal extends Component {

    onClose() {
        this.props.toggleModal('shortTermGoal');
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
                    this.props.toggleModal('shortTermGoal'); //close modal once goal is created
                }, 2000)
            }
        });

    };

    render() {
        const title = 'Add your short-term goal!';

        const content = <React.Fragment>

            <p>Short-term goals are defined in <strong>days or weeks</strong> and relate with your long term goal
                purpose.</p>

            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                <Field name="title" component={renderInput} label="Enter title"
                       placeholder="A summary about what's your goal about"/>
                <Field name="description" textarea={true} component={renderInputTextArea} label="Enter description"
                       placeholder="Describe what you have to do in details, to accomplish it"/>
                <Field name="duration_hrs" type="number" optional={true} component={renderInput}
                       label="Estimated duration (hrs)"/>
                <Field name="deadline" type="date" component={renderInput}
                       label="Deadline"/>
                <Field name="priority" component={renderInputCheckbox}
                       label="Is this a priority goal?"/>
            </form>
        </React.Fragment>;


        const actions = <React.Fragment>
            <button className="ui button positive" onClick={this.props.handleSubmit(this.onSubmit)}>New Goal</button>
            <button className="ui button negative" onClick={() => this.onClose()}>Cancel</button>
        </React.Fragment>;

        return (
            <Modal name='shortTermGoal' title={title} content={content} actions={actions}/>
        );
    }

}


const mapStateToProps = (state, ownProps) => {

    const {boardShowGoals, modals} = state.ui;

    return {
        myProps: ownProps,
        modals: modals,
        boardShowGoals: boardShowGoals,
        initialValues: {
            title: '',
            description: '',
            duration_hrs: '',
            deadline: '',
            priority: false,
        }
    };
};

const formWrapped = reduxForm({
    form: 'AddShortTermGoalModal',
    enableReinitialize: true
})(AddShortTermGoalModal);

export default connect(mapStateToProps, {
    //some actions here
    toggleModal,
    createGoal,
    loadGoals
})(formWrapped)
