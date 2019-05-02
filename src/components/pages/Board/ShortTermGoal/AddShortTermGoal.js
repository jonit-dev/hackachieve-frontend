import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Modal from "../../../UI/Modal/Modal";
import {toggleModal} from "../../../../actions/uiActions";

class AddShortTermGoalModal extends Component {
    /*
    * Output sample
    {
	"title":"test goal2",
	"description": "updated goal",
	"duration_hrs": 0,
	"deadline": "2019-02-27",
	"column_id": "1",
	"priority": 0
}
    *
    *
    * */

    componentDidMount() {
        console.log(`Adding short term goal for long term goal ID: ${this.props.myProps.longTermGoalId}`);
    }


    onClose() {
        this.props.toggleModal('shortTermGoal');
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

    renderInputTextArea({input, label, meta, optional, placeholder}) {
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

    renderInputCheckbox({input, meta, optional, label}) {
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
        const title = 'Add your short-term goal!';

        const content = <React.Fragment>

            <p>Short-term goals are defined in <strong>days or weeks</strong> and relate with your long term goal
                purpose.</p>

            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                <Field name="title" component={this.renderInput} label="Enter title"
                       placeholder="A summary about what's your goal about"/>
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
            <button className="ui button positive" onClick={this.props.handleSubmit(this.onSubmit)}>New Goal</button>
            <button className="ui button negative" onClick={() => this.onClose()}>Cancel</button>
        </React.Fragment>;

        return (
            <Modal name='shortTermGoal' title={title} content={content} actions={actions}/>
        );
    }


    onSubmit = (formValues) => {

        let formOutput = {...formValues, column_id: this.props.myProps.longTermGoalId};

        console.log(formOutput);

    };
}


const mapStateToProps = (state, ownProps) => {
    return {
        myProps: ownProps,
        modals: state.ui.modals,
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
    toggleModal
})(formWrapped)
