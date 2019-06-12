import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import moment from 'moment';
import DatePicker from '../../../UI/Datepicker';
import Modal from "../../../UI/Modal/Modal";
import {toggleModal} from "../../../../actions/uiActions";
import {createLongTermGoal, loadGoals, loadUserGoalsCategories, editColumns, createNewCategory, deleteNewCategory} from "../../../../actions/goalsActions";
import Loading from "../../../UI/Loading/Loading";
import {TagSelector} from './TagSelector';


class EditLongTermGoalModal extends Component {

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


            const boardName = this.props.myProps.longTermGoal.boardName;
            const board_id = this.props.boardCategories.find((category) => category.name === boardName).id;

            console.log('setting board id to...' + board_id);

            this.props.change('board_id', board_id)
        });
    }


    onClose() {
        this.props.toggleModal('editLongTermGoal');
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
        //return this.props.boardCategories.map((category) => <option key={category.id}
        //                                                            value={category.id}>{category.name}</option>);
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
        const title = 'Edit your Long Term goal!';

        const content = <React.Fragment>


            <p>A long-term goal is something you want to do in the future, for example, in the next 3 months.</p>

            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                <Field name="name" component={this.renderInput} label="Enter a long term goal title"
                       placeholder="A summary about what's your goal about"/>

                <Field name="description" textarea={true} component={this.renderInputTextArea}
                       label="Enter your long term goal description"
                       placeholder="Describe what you have to do in details, to accomplish it"/>

                {/* <Field name="board_id" component={this.renderInputSelectBoards}
                       label="Category">
                    {this.props.boardCategories ? this.onRenderBoardOptions() : <Loading/>}
                </Field> */}
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
                    currentDeadline={this.props.myProps.longTermGoal.deadline}
                    dateFormatCalendar="MMMM"
                    placeholderText="Select deadline"
                    fixedHeight

                    showMonthDropdown
                    showYearDropdown
                    scrollableYearDropdown

                    minDate={new Date()}
                    // maxDate={new Date(this.props.deadline)}
                    // dropdownMode="select"
                    normalize={value => (value ? moment(value).format('YYYY-MM-DD') : null)}
                    component={DatePicker}
                />
            </form>
        </React.Fragment>;


        const actions = <React.Fragment>
            <button className="ui button positive" onClick={this.props.handleSubmit(this.onSubmit)}>Update</button>
            <button className="ui button negative" onClick={() => this.onClose()}>Cancel</button>
        </React.Fragment>;

        return (
            <Modal name='editLongTermGoal' title={title} content={content} actions={actions}/>
        );
    }


    onSubmit = (formValues) => {
        console.log(this.props);
        let formOutput = {
            column_data: {
                ...formValues
            },
            column_id: this.props.myProps.longTermGoal.id
        };

        this.props.editColumns(formOutput).then((response) => {

            const {status} = response.data;

            if (status === 'success') {

                this.props.loadGoals(0, this.props.boardShowGoals); //refresh goals (to display new one)

                setTimeout(() => {
                    this.props.toggleModal('editLongTermGoal'); //close modal once goal is created
                }, 500)

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
            name: ownProps.longTermGoal.title,
            description: ownProps.longTermGoal.description,
            deadline: ownProps.longTermGoal.deadline.split('T')[0],
            //board id is set on componentDidMount
        }
    };
};

const formWrapped = reduxForm({
    form: 'EditLongTermGoalModal',
    enableReinitialize: true
})(EditLongTermGoalModal);

export default connect(mapStateToProps, {
    //some actions here
    toggleModal,
    createLongTermGoal,
    loadGoals,
    loadUserGoalsCategories,
    editColumns,
    createNewCategory, // This is for creating new category
    deleteNewCategory
})(formWrapped)
