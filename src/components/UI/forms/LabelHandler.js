import React, {Component} from 'react';

import {connect} from 'react-redux'
import {Field, reduxForm, change, untouch, formValueSelector} from "redux-form";
import LabelList from "./LabelList";
import {createLabels, deleteLabels, loadLabels, updateLabel} from "../../../actions/goalLabelsAction";


class LabelHandler extends Component {

    state = {
        showTagsInput: false,
        //status: true,
        editableTag: {
            id: null,
            name: null,
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


        //if there's, create a new tag
        if (this.props.tag) {

            const newTag = {
                tag: this.props.tag
            };

            this.props.createLabels(newTag, goalId).then(resp => {
                this.resetFields('AddLabels', {
                    tag: '',
                });
                this.props.loadLabels(goalId); //refresh afte radding
            })
        }


        //close tag add
        this.onCloseTagAdd();
    };

    onCloseTagAdd() {
        this.setState({
            showTagsInput: !this.state.showTagsInput
        })
    }

    deleteLabels = (label) => {
        this.props.deleteLabels(label)
    };


    hideLabelUpdateForm = (add) => {

        const goalId = this.props.myProps.goalId;

        this.setState({
            editableTag: {
                id: null,
                name: null,
            }
        });

        if (add) {
            this.props.loadLabels(goalId)
        }
    };

    onSubmit = (formValue) => {


        const goalId = this.props.myProps.goalId;

        this.props.createLabels(formValue, goalId).then(resp => {

            //clear reduxform fields
            this.resetFields('AddLabels', {
                tag: '',
            });
            this.props.loadLabels(goalId);

            //close tag
            this.onCloseTagAdd();
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


    editLabelList(id, name) {

        this.setState({
            editableTag: {
                id: id,
                name: name
            }
        }, () => {
            console.log('editable tag state');
            console.log(this.state.editableTag);
        })
    };


    onRenderLabels() {


        return this.props.labels && this.props.labels.map((label) => {


            if (this.state.editableTag.id === label.id) {
                console.log('showing editable tag');
                console.log(this.state.editableTag);
                console.log(label);


                return <LabelList key={label.id} label={label}
                                  hideLabelUpdateForm={this.hideLabelUpdateForm}
                                  initialValues={{
                                      label: label.name,
                                  }}/>;

            } else {
                return <a key={label.id} className="goal" href=" #"
                          onClick={(e) => {
                              e.preventDefault();
                              this.editLabelList(label.id, label.name)
                          }
                          }>
                    {label.name}
                    <i key={label.id} className="close icon" onClick={(e) => {
                        e.stopPropagation();
                        this.deleteLabels(label);
                    }}>
                    </i>
                </a>;
            }
        })
    }

    render() {

        return (
            <div className="tags">

                <label>Tags</label>

                {this.state.showTagsInput &&
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                    <Field name="tag" component={this.renderInput}
                           placeholder="Type and press 'Enter'"
                    />
                </form>}

                {this.onRenderLabels()}
                <>
                    <a className="add-tag" href="# " onClick={this.addTagsClick}>
                        <img src="images/icons/plus.svg"
                             alt="add new tag button"
                        /> Add</a>
                </>

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


