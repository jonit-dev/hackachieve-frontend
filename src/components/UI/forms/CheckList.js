import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { checklistAddItem, checklistFetchItem, checklistUpdateItem } from "../../../actions/checkListAction";

class CheckList extends Component {
	state = {
		showChecklistForm: true,
		//status: true,
		editChecklist: ''
	};

	handleClick = () => {
		this.setState({
			showChecklistForm: !this.state.showChecklistForm,
			editChecklist: ''
		});
		this.props.closeForm(false);
	};

	componentWillMount() {
		if (this.props.item) this.props.initialize({ item: this.props.item.description })
	}

	renderInputTextArea({ input, label, meta, optional, placeholder, meta: { touched, error, warning } }) {

		return (
			<div className="field">
				<textarea {...input} rows="3" placeholder={placeholder} />
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
		// const {id, description} = this.props.item || {};
		const { id } = this.props.item || {};
		const form = <React.Fragment>
			<form className="ui form">
				<Field
					name="item"
					textarea={true}
					component={this.renderInputTextArea}
					placeholder="Add an item"
					validate={[required]}
				/>
				<div>
				<button className="add-task" type="submit" onClick={this.props.handleSubmit(this.onSubmit)}><img src="/images/icons/plus-white.svg" alt="add task" /> {id ? "Save" : "Add"}</button>
				{this.props.showChecklistForm &&
					<button className="cancel" onClick={this.handleClick} >Cancel</button>
			}
				</div>
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

		// var {id, description} = this.props.item || {}
		var { id } = this.props.item || {};
		if (id) {
			let checklist = {
				description: formValues.item,
				status: false,
				goal_id: this.props.goal_id
			};
			this.props.checklistUpdateItem(id, checklist).then(resp => {

				this.props.hideForm();
			})
		} else {
			let checklist = {
				description: formValues.item,
				status: false,
				goal_id: this.props.goal_id
			};


			this.props.checklistAddItem(checklist).then(resp => {


				this.props.checklistFetchItem(this.props.modals.goalContent.id); //trigger a checklist refresh
			})


		}
	};
}


const formWrapped = reduxForm({
    form: 'CheckList',

})(CheckList);
const required = value => (value ? undefined : 'Item Description required');

const mapStateToProps = (state, ownProps) => {

	return {
		myProps: ownProps,
		modals: state.ui.modals
	};
};

export default connect(mapStateToProps, {
	//some actions here
	checklistAddItem,
	checklistFetchItem,
	checklistUpdateItem
})(formWrapped)

