import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Modal from "../../../UI/Modal/Modal";
import {loadUserGoalsCategories, toggleModal} from "../../../../actions/uiActions";
import {createLongTermGoal, loadGoals} from "../../../../actions/goalsActions";
import Loading from "../../../UI/Loading/Loading";

class AddLongTermGoalModal extends Component {


    componentDidMount() {
        this.props.loadUserGoalsCategories().then(() => {
            //set first option as selected
            this.props.change('board_id',this.props.boardCategories[0].id)
        });
    }


    onClose() {
        this.props.toggleModal('longTermGoal');
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

    onRenderBoardOptions() {
        return this.props.boardCategories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>);
    }

    renderInputSelectBoards({input, meta, optional, label, children}) {

        return (
            <div className="field">
                <label>{label}</label>
                <select {...input}>
                    {children}
                </select>
            </div>
        )
    }

    render() {
        const title = 'Add your Long Term goal!';

        const content = <React.Fragment>


            <p>A long-term goal is something you want to do in the future, for example, in the next 3 months.</p>

            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                <Field name="name" component={this.renderInput} label="Enter a long term goal title"
                       placeholder="A summary about what's your goal about"/>
                <Field name="description" textarea={true} component={this.renderInputTextArea}
                       label="Enter your long term goal description"
                       placeholder="Describe what you have to do in details, to accomplish it"/>

                <Field name="board_id" component={this.renderInputSelectBoards}
                       label="Category">
                    {this.props.boardCategories ? this.onRenderBoardOptions() : <Loading/>}
                </Field>

                <Field name="deadline" type="date" component={this.renderInput}
                       label="Deadline"/>
            </form>
        </React.Fragment>;


        const actions = <React.Fragment>
            <button className="ui button positive" onClick={this.props.handleSubmit(this.onSubmit)}>New Goal</button>
            <button className="ui button negative" onClick={() => this.onClose()}>Cancel</button>
        </React.Fragment>;

        return (
            <Modal name='longTermGoal' title={title} content={content} actions={actions}/>
        );
    }


    onSubmit = (formValues) => {

        let formOutput = {...formValues, board_id: this.props.myProps.longTermGoalId};

        // console.log('creating new goal ==> ');
        console.log(formOutput);

        this.props.createLongTermGoal(formOutput).then((response) => {

            const {status} = response.data;

            if (status === 'success') {

                this.props.loadGoals(0, 'all'); //refresh goals (to display new one)

                setTimeout(() => {
                    this.props.toggleModal('longTermGoal'); //close modal once goal is created
                }, 4000)

            }


        });

    };
}


const mapStateToProps = (state, ownProps) => {

    const {modals, boardCategories} = state.ui;

    return {
        myProps: ownProps,
        modals: modals,
        boardCategories: boardCategories,
        initialValues: {
            name: '',
            description: '',
            deadline: '',
            board_id: null
        }
    };
};

const formWrapped = reduxForm({
    form: 'AddLongTermGoalModal',
    enableReinitialize: true
})(AddLongTermGoalModal);

export default connect(mapStateToProps, {
    //some actions here
    toggleModal,
    createLongTermGoal,
    loadGoals,
    loadUserGoalsCategories
})(formWrapped)
