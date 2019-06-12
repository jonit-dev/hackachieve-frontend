import React, {Component} from 'react';
import {Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import { loadLabels, updateLabel} from "../../../actions/goalLabelsAction";

class LabelList extends Component {

    componentWillMount() {
        if (this.props.label) this.props.initialize({label: this.props.label.name})
    }   

    renderInput({input, optional, type, placeholder, meta: {touched, error, warning}}) {

        return (
            <div className="field">
               <input {...input} type={type} placeholder={placeholder}/>
                {(optional ? <>
                    <div className="ui pointing label">
                        Optional Field
                    </div>
                </> : null)}
                {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
            </div>
        )
    }

    handleCancelClick = () => {
        this.setState({
            showChecklistForm: !this.state.showChecklistForm,
            editChecklist: ''
        })
    };

    render() {
        // const {id, description} = this.props.item || {};
        const {id} = this.props.item || {};
        const form = <React.Fragment>
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                <Field
                    name="label"
                    textarea={true}
                    component={this.renderInput}
                    placeholder="Add an item"
                    validate={[required]}
                />
                
              

            </form>
        </React.Fragment>;
       
        return (
            <div>
                {form}
                <div class="btn-group">
              
              
</div>
<button className="ui button positive" type="cancel" onClick ={()=> this.props.hideLabelUpdateForm(false)}> Cancel</button>

            </div>
        );
    }

    onSubmit = (formValues) => {

            this.props.updateLabel(this.props.label.id, formValues.label).then(resp => {
                this.props.hideLabelUpdateForm(true);
            })
        
    };
}


const formWrapped = reduxForm({
    form: 'LabelForm',
    enableReinitialize: true,
    destroyOnUnmount: false 

})(LabelList);
const required = value => (value ? undefined : 'Please enter your tag name');

const mapStateToProps = (state, ownProps) => {

    return {
        myProps: ownProps,
        modals: state.ui.modals
    };
};

export default connect(mapStateToProps, {
    //some actions here
    loadLabels,
    updateLabel
})(formWrapped)

