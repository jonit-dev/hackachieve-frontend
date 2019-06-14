import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import moment from 'moment';
import DatePicker from '../../../UI/Datepicker';
import Modal from "../../../UI/Modal/Modal";
import {toggleModal} from "../../../../actions/uiActions";
import {
    createLongTermGoal,
    loadGoals,
    loadUserGoalsCategories,
    editColumns,
    createNewCategory,
    deleteNewCategory
} from "../../../../actions/goalsActions";
import Loading from "../../../UI/Loading/Loading";
import {CategorySelector} from "./CategorySelector";


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

        this.onLoadBoardCategories();
    }

    onLoadBoardCategories() {

        return this.props.loadUserGoalsCategories().then(() => {
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


    createCategory(data) {

        const {value, label} = data;

        let board_id = parseInt(value);

        console.log('createCategory()');
        console.log(data);

        switch (data.action) {
            case 'clear':

                //delete category
                const delete_board_id = this.state.currentSelectableValue.id;

                this.props.deleteNewCategory(delete_board_id).then((response) => {
                    this.onLoadBoardCategories(); //refresh board categories
                });


                break;

            case 'select-option':

                //set current selected option on state
                this.setState({
                    currentSelectableValue: {
                        id: board_id,
                        label: label
                    }
                }, () => {
                    console.log(this.state);
                });

                break;

            case 'create-option':

                this.props.createNewCategory(value).then(response => {
                    // let {currentSelectableValue} = this.state;
                    console.log(response);

                    this.onLoadBoardCategories().then(() => { //refresh board categories, with new one

                        //find the recently added category
                        let newCategory = this.props.boardCategories.find(category => category.name === label);

                        //set category on component level state (it will be used on submit - formValues)
                        this.setState({
                            currentSelectableValue: {
                                id: newCategory.id,
                                label: newCategory.name
                            }
                        });
                    });
                });
                break;


        }
    }


    render() {
        const title = 'Edit your Long Term goal!';

        const content = <React.Fragment>


            <p className="modal-subtitle">A long-term goal is something you want to do in the future, for example, in the next 3 months.</p>

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
                               component={CategorySelector}
                               options={this.onRenderBoardOptions()}
                               onChange={(data, actions) => {

                                   console.log('CategorySelector:');
                                   console.log(data);
                                   if (data) { //make sure its not null
                                       this.createCategory(data, actions);
                                   }
                                   // this.onLoadBoardCategories(); //refresh board categories
                               }}
                        />
                        :
                        <Loading/>
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

        formOutput.column_data.board_id = this.state.currentSelectableValue.id; //get category id

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
