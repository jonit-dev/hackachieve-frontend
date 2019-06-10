import React, {Component} from 'react';
import * as ReactDOM from "react-dom";
import {connect} from 'react-redux'
import {toggleModal,clearAlert} from "../../../actions/uiActions";
import {createLabels,loadLabels} from '../../../actions/goalLabelsAction'
import Alert from "../Alert/Alert";
import CheckList from "../../UI/forms/CheckList";
import {fetchItem, changeStatus, deleteItem} from "../../../actions/checkListAction";
import cogoToast from 'cogo-toast';
import {Field, reduxForm} from 'redux-form';
import { h } from 'react-select/dist/chunk-e8ae4b0f.esm';

class Modal extends Component {
    state = {
        showChecklistForm: false,
        showTagsInput:false,
        //status: true,
        editChecklist: ''
    };

    onClose() {
        console.log('closing modal');
        this.props.toggleModal(this.props.myProps.name); //close this modal
    }

    componentWillReceiveProps(newProps) {
        if(newProps.alert.type && newProps.alert.type==="positive"){
            cogoToast.success(newProps.alert.content)
            this.props.clearAlert()
         }

     }
 
    onRenderAlert() {
        return (this.props.alert.type && this.props.alert.type==='negative'? <Alert type={this.props.alert.type} title={this.props.alert.title}
                                               content={this.props.alert.content}/> : null)
    }

    handleClick = () => {
        this.setState({
            showChecklistForm: !this.state.showChecklistForm,
            editChecklist: ''
        })
    };

    addTagsClick=()=>{
        this.setState({
            showTagsInput: !this.state.showTagsInput
        })
    }

    editChecklist(id = "") {
        this.setState({
            editChecklist: id ? id : "",
            showChecklistForm: false
        })
    }

    componentDidMount() {
        this.props.fetchItem(this.props.modals.goalContent.id) //fetch checklist from specific goal ID
        this.props.loadLabels();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {


        //this checks if new items were added. If so, close the textarea
        if (prevProps.items.length !== this.props.items.length) {
            this.editChecklist();
        }


    }

    changeStatus = (item) => {
        this.props.changeStatus(item)
    };
    deleteItem = (item) => {
        this.props.deleteItem(item)
    };

    hideForm = () => {
        this.setState({
            editChecklist: ""
        })
    };
    onSubmit=(formValue)=>{
        this.props.createLabels(formValue).then((response)=>{
            console.log("response===",response)
            // if(response.data.status=='success'){
            //     cogoToast.success(response.data.message);
            // }else{
            //     cogoToast.error(response.data.message)
            // }
        })

    }

    renderInput({input, label, meta, optional, type, textarea, placeholder}) {
        return (

            <div class="ui left icon right labeled input">
                         <input {...input} type={type} placeholder={placeholder}/>
                         <i aria-hidden="true" class="tags icon"></i>
                    </div>
          
        )
    }

    render() {
        return ReactDOM.createPortal(
            <div className="ui dimmer modals visible active" onClick={(e) => {
                e.stopPropagation();
                this.onClose();
            }}>
                <div className="ui standard modal visible active" onClick={(e) => e.stopPropagation()}>
                    <i className="close icon" onClick={(e) => this.onClose()}></i>
                    <div className="header">{this.props.myProps.title}</div>


                <div class="ui segment">
                    {this.state.showTagsInput &&  
                    
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">


                    <Field name="name" component={this.renderInput} 
                       placeholder="Enter Tags"
                       tags={this.props.labels}/>
                    </form>}
                    
                     <div>
                         <button class="ui primary button" onClick={this.addTagsClick}>Add Tags</button>

                    </div>


                        {console.log('labels====',this.props.labels.value)}

                        {
                            this.props.labels.value && this.props.labels.value.map((label)=>{

                                return <label>{label.name}</label>
                          
                            })
                        }

                    {/* {
                      this.props.labels && this.props.labels.map((label)=>{
                          console("value====",label);
                      })
                    } */}

                </div>

                    <div className="content">
                        {this.onRenderAlert()}

                        {this.props.myProps.content}
                        {this.props.name === "goalContent" &&


                        <div className="checklist">

                            <h4>Checklist</h4>


                            {(this.props.items.length === 0 ?

                                <p className="checklist-warning">Click on "Add" to create your checklist</p> : null)}

                            {
                                // eslint-disable-next-line
                                this.props.items && this.props.items.map((item) => {

                                    if (item.id) {
                                        return (<div className="checklist-item" key={item.id}>
                                            <div className="ui checkbox">
                                                <input type="checkbox" name="example"
                                                       onClick={() => this.changeStatus(item)}
                                                       defaultChecked={item.status}/>
                                                {this.state.editChecklist === item.id ? <>
                                                    <CheckList
                                                        goal_id={this.props.modals.goalContent.id}
                                                        item={item}
                                                        hideForm={this.hideForm}/>


                                                    <i className="edit icon"
                                                       onClick={() => this.editChecklist()}> </i> </> : <>
                                                    <label style={item.status ? {textDecoration: "line-through"} : {}}
                                                           onClick={() => this.editChecklist(item.id)}>{item.description} </label>

                                                    <i className="close icon"
                                                       onClick={() => this.deleteItem(item)}> </i> </>
                                                }
                                            </div>
                                        </div>)
                                    }


                                }
                            )
                            }


                            {/*<div className="ui list">*/}
                            {/*    {this.props.items && this.props.items.map((item) => */}
                            {/*        <div className="item" key={item.id}>*/}
                            {/*            <div className="ui checkbox">  */}
                            {/*                <input type="checkbox" name="example" onClick={() => this.changeStatus(item)} defaultChecked={item.status}/>*/}
                            {/*                {this.state.editChecklist === item.id ? <>*/}
                            {/*                <CheckList goal_id={this.props.modals.goalContent.id} item={item} hideForm={this.hideForm}/>*/}
                            {/*                <button className="ui button" onClick={() => this.editChecklist()}>X</button> </> : <>*/}
                            {/*                <label style={item.status ? {textDecoration: "line-through"} : {}} onClick={() => this.editChecklist(item.id)}>{item.description}</label>*/}
                            {/*                <button className="ui button" onClick={() => this.deleteItem(item)}>X</button> </>*/}
                            {/*                }*/}
                            {/*            </div> */}
                            {/*        </div>*/}
                            {/*    )*/}
                            {/*    }*/}
                            {/*</div>*/}

                            <div className="checklist-action-area">


                                {!this.state.showChecklistForm &&
                                <button className="ui button positive add" onClick={this.handleClick}>Add an
                                    item</button>
                                }
                                {this.state.showChecklistForm && <div>
                                    <CheckList goal_id={this.props.modals.goalContent.id}/>
                                    <button className="ui button negative cancel" onClick={this.handleClick}>Cancel
                                    </button>
                                </div>}

                            </div>

                        </div>
                        }
                    </div>
                    <div className="actions">
                        {this.props.myProps.actions}
                    </div>
                </div>
            </div>, document.querySelector('#modal'))
    }
}

const mapStateToProps = (state, ownProps) => {


    return {
        myProps: ownProps,
        alert: state.alert.message,
        modals: state.ui.modals,
        items: state.checklist.items,
        checklist: state.checklist,
        labels: state.labels.labels
        
    };
};

const formWrapped = reduxForm({
    form: 'AddLabels',
    enableReinitialize: true
})(Modal);

export default connect(mapStateToProps, {
    //actions here
    toggleModal,
    fetchItem,
    changeStatus,
    deleteItem,
    clearAlert,
    createLabels,
    loadLabels
})(formWrapped);

