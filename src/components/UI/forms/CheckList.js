import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {addItem, fetchItem, updateItem} from "../../../actions/checkListAction";

class CheckList extends Component {

    componentWillMount() {
        if (this.props.item) this.props.initialize({item: this.props.item.description})
    }

    renderInputTextArea({input, label, meta, optional, placeholder, meta: {touched, error, warning}}) {
        return (
            <div className="field">
                <textarea {...input} rows="3" placeholder={placeholder}/>
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

    render() {
        const {id, description} = this.props.item || {}
        const form = <React.Fragment>
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                <Field
                    name="item"
                    textarea={true}
                    component={this.renderInputTextArea}
                    placeholder="Add an item"
                    validate={[required]}
                />
                <button className="ui button positive" type="submit"> {id ? "save" : "Add"}</button>
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
        var {id, description} = this.props.item || {}
        if (id) {
            let checklist = {
                description: formValues.item,
                status: false,
                goal_id: this.props.goal_id
            };
            this.props.updateItem(id, checklist).then(resp => {
                this.props.hideForm();
            })
        } else {
            let checklist = {
                description: formValues.item,
                status: false,
                user_id: 2,
                goal_id: this.props.goal_id
            };
            this.props.addItem(checklist).then(resp => {

                this.props.fetchItem(this.props.modals.goalContent.id); //trigger a checklist refresh

            })
        }
    };
}


const formWrapped = reduxForm({
    form: 'CheckList',

})(CheckList);
const required = value => (value ? undefined : 'Item Description required');

const mapStateToProps = (state) => {
    return {
        modals: state.ui.modals
    };
};

export default connect(mapStateToProps, {
    //some actions here
    addItem,
    fetchItem,
    updateItem
})(formWrapped)

