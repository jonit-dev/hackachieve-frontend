import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
//import Modal from "../../../UI/Modal/Modal";
//import {toggleModal} from "../../../../actions/uiActions";
import {addItem} from "../../../actions/checkListAction";
//import Loading from "../../../UI/Loading/Loading";

class CheckList extends Component {
    renderInputTextArea({input, label, meta, optional, placeholder}) {
        return (
            <div className="field">
                <textarea {...input} rows="3" placeholder={placeholder}/>
                {(optional ? <>
                    <div className="ui pointing label">
                        Optional Field
                    </div>
                </> : null)}
            </div>
        )
    }
    render() {

        const form = <React.Fragment>
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                <Field name="item" textarea={true} component={this.renderInputTextArea}
                       placeholder="Add an item"/>
                       <button className="ui button positive" type="submit">Add</button>
            </form>
        </React.Fragment>;


        const button = <React.Fragment>
            
        </React.Fragment>;

        return (
            <div>
                {form}
                {button}
             </div>   
        );
    }


    onSubmit = (formValues) => {
        let checklist = {
            description:formValues.item,
            status: false,
            user_id: 2,
            goal_id:this.props.goal_id
            
        };
        console.log(checklist)
        this.props.addItem(checklist)
    };
}



const formWrapped = reduxForm({
    form: 'CheckList',
    enableReinitialize: true
})(CheckList);

export default connect(null, {
    //some actions here
    addItem, 
})(formWrapped)
