import React, {Component} from 'react';

import {connect} from 'react-redux'
import {Field, reduxForm, change, untouch} from "redux-form";
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
        this.props.loadLabels();
    }

    addTagsClick = () => {
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
        this.setState({
            editableTag: {
                id: "",
                name: '',
            }
        })

        if (add) {
            this.props.loadLabels()

        }
    };

    onSubmit = (formValue) => {
        this.props.createLabels(formValue).then(resp => {
            this.resetFields('AddLabels', {
                tag: '',

            });
            this.props.loadLabels();
        })
    }

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
                                        <label    onClick={() => this.editLabellist(label.id)}>{label.name} </label>
                                        <i  className="close icon" onClick={() => this.deleteLabels(label)}> </i>
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

const mapStateToProps = (state) => {
    return {
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

