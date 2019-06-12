import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import moment from 'moment';
import {connect} from 'react-redux';
import Modal from "../../../UI/Modal/Modal";
import DatePicker from '../../../UI/Datepicker';
import {toggleModal} from "../../../../actions/uiActions";
import {createLongTermGoal, loadGoals, loadUserGoalsCategories, createNewCategory, deleteNewCategory} from "../../../../actions/goalsActions";
import Loading from "../../../UI/Loading/Loading";
import {TagSelector} from './TagSelector';

class AddLongTermGoalModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSelectableValue: {
                id: 0,
                value: ""
            },
        }
    }


    componentDidMount() {

        this.props.loadUserGoalsCategories().then(() => {
            //set first option as selected
            this.props.change('board_id', this.props.boardCategories[0].id)
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
        // return this.props.boardCategories.map((category) => <option key={category.id}
        //                                                             value={category.id}>{category.name}</option>);
        return this.props.boardCategories.map((category) => ({value: "" + category.id, label: "" + category.name}));
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

    deleteCategory() {
        let { currentSelectableValue } = this.state;
        this.props.deleteNewCategory(currentSelectableValue.id).then(response => {
            console.log(response);
            if(response.data.type == "success") {
                // delete the state
                currentSelectableValue.id = 0;
                currentSelectableValue.value = "";
                this.setState({currentSelectableValue});
            }
        });
    }

    createCategory(value) {
        // this will handle the api call and registers the id of the 
        // new category and replace the value field of the category object 
        // in the creatable select component
        if(value) {
            this.props.createNewCategory(value.value).then(response => {
                let { currentSelectableValue } = this.state;
                console.log(response);
                // TODO: To set the current value with the id to the state
            });
        }
        else {
            this.deleteCategory();
        }
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

                <strong><label>Category</label></strong>
                {
                    (this.props.boardCategories) ? 
                    <Field name="board_id"
                        label="Category"
                        component={TagSelector}
                        tags={this.onRenderBoardOptions()}
                        onChange={value => {this.createCategory(value)}}
                    /> 
                    : 
                    <Loading />
                }

                <Field
                    name="deadline"
                    label="Deadline" 
                    inputValueFormat="YYYY-MM-DD"
                    // dateFormat="L"
                    dateFormatCalendar="dddd"
                    placeholderText="Select deadline"
                    fixedHeight
                    showMonthDropdown
                    showYearDropdown
                    minDate={new Date()}
                    maxDate={new Date(this.props.deadline)}
                    dropdownMode="select"
                    normalize={value => (value ? moment(value).format('YYYY-MM-DD') : null)}
                    component={DatePicker}
                />
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

        let formOutput = {...formValues};

        // console.log('creating new goal ==> ');
        // console.log(formOutput);

        this.props.createLongTermGoal(formOutput).then((response) => {

            const {status} = response.data;

            if (status === 'success') {

                this.props.loadGoals(0, this.props.boardShowGoals); //refresh goals (to display new one)

                setTimeout(() => {
                    this.props.toggleModal('longTermGoal'); //close modal once goal is created
                }, 500)

            }


        });

    };
}


const mapStateToProps = (state, ownProps) => {

    const {modals, boardCategories, boardShowGoals} = state.ui;

    return {
        myProps: ownProps,
        modals: modals,
        boardCategories: boardCategories,
        boardShowGoals: boardShowGoals,
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
    loadUserGoalsCategories,
    createNewCategory, // This is for creating new category
    deleteNewCategory
})(formWrapped)
