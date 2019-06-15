import React, {Component} from 'react';

import {connect} from 'react-redux'
import {Field, reduxForm, change, untouch, formValueSelector} from "redux-form";
import LabelList from "./LabelList";
import {createLabels, deleteLabels, loadLabels, updateLabel} from "../../../actions/goalLabelsAction";


class LabelHandler extends Component {


    /* Label =========================================== */

    state = {
        showTagsInput: false,
        //status: true,
        editableTag: {
            id: "",
            name: "",
        }
    };

    componentDidMount() {

        const goalId = this.props.myProps.goalId;

        console.log(`fetching labels from goal ${goalId}`);
        this.props.loadLabels(goalId);
    }

    addTagsClick = () => {

        //check if there's some content on add tags input

        const goalId = this.props.myProps.goalId;

        if(this.props.tag) {


            const newTag = {
                tag: this.props.tag
            };

            console.log('Creating new tag...');
            console.log(newTag);

            this.props.createLabels(newTag, goalId).then(resp => {
                this.resetFields('AddLabels', {
                    tag: '',
                });
                this.props.loadLabels(goalId); //refresh afte radding
            })
        }


        //close tag add

        this.setState({
            showTagsInput: !this.state.showTagsInput
        })
    };

    deleteLabels = (label) => {
        this.props.deleteLabels(label)
    };


    editLabellist(id, name) {
        this.setState({
            editableTag: {
                id,
                name,
            }
        })
    };


    hideLabelUpdateForm = (add) => {

        const goalId = this.props.myProps.goalId;


        this.setState({
            editableTag: {
                id: "",
                name: '',
            }
        });

        if (add) {
            this.props.loadLabels(goalId)

        }
    };

    onSubmit = (formValue) => {


        const goalId = this.props.myProps.goalId;

        this.props.createLabels(formValue, goalId).then(resp => {
            this.resetFields('AddLabels', {
                tag: '',

            });
            this.props.loadLabels(goalId);
        })
    };

    renderInput({input, type, placeholder}) {
        return (

            <div className="ui left icon right labeled input">
                <input {...input} type={type} placeholder={placeholder}/>
                <i aria-hidden="true" className="tags icon"></i>
            </div>

        )
    }

    resetFields = (formName, fieldsObj) => {
        Object.keys(fieldsObj).forEach(fieldKey => {

            //reset the field's value
            this.props.dispatch(change(formName, fieldKey, fieldsObj[fieldKey]));

            //reset the field's error
            this.props.dispatch(untouch(formName, fieldKey));

        });
    };


    /*  =========================================== */


    render() {

 
        
        return (

            <div className="ui segment">
                {this.state.showTagsInput &&


                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">


                    <Field name="tag" component={this.renderInput}
                           placeholder="Type and press 'Enter'"
                    />
                </form>}

                <div>
                    <button className="ui primary button" onClick={this.addTagsClick}>Add Tags</button>

                </div>

                <div>
                </div>
                <ul style={{display: 'inline'}}>
                    {
                        this.props.labels && this.props.labels.map((label) => {
                            return <li key={label.id} style={{
                                float: "left",
                                margin: '5px',
                                border: "5px solid #D3D3D3	",
                                background: '#D3D3D3	'
                            }}>

                                {this.state.editableTag.id === label.id ?
                                    <LabelList label={label} hideLabelUpdateForm={this.hideLabelUpdateForm}
                                               initialValues={{
                                                   label: label.name,
                                               }}/> : <>
                                        <label onClick={() => this.editLabellist(label.id)}>{label.name} </label>
                                        <i className="close icon" onClick={() => this.deleteLabels(label)}> </i>
                                    </>}
                            </li>
                        })
                    }
                </ul>

                {/* {
                      this.props.labels && this.props.labels.map((label)=>{
                      })
                    } */}

            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {

    const selector = formValueSelector('AddLabels');

    return {
        tag: selector(state, 'tag'), //we use this selector here to pass our input field (tag) to our props
        myProps: ownProps,
        labels: state.labels.labels
    };
};


const formWrapped = reduxForm({
    form: 'AddLabels',
    enableReinitialize: true
})(LabelHandler);


export default connect(mapStateToProps, {
    createLabels,
    loadLabels,
    deleteLabels,
    updateLabel,
})(formWrapped);

