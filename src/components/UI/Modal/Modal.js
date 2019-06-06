import React, {Component} from 'react';
import * as ReactDOM from "react-dom";
import {connect} from 'react-redux'
import {toggleModal} from "../../../actions/uiActions";
import Alert from "../Alert/Alert";
import CheckList from "../../UI/forms/CheckList";
import {fetchItem, changeStatus, deleteItem} from "../../../actions/checkListAction";

class Modal extends Component {
    state = {
        showChecklistForm: false,
        //status: true,
        editChecklist: ''
    };

    onClose() {
        console.log('closing modal');
        this.props.toggleModal(this.props.myProps.name); //close this modal
    }

    onRenderAlert() {
        return (this.props.alert.type ? <Alert type={this.props.alert.type} title={this.props.alert.title}
                                               content={this.props.alert.content}/> : null)
    }

    handleClick = () => {
        this.setState({
            showChecklistForm: !this.state.showChecklistForm,
            editChecklist: ''
        })
    };

    editChecklist(id = "") {
        this.setState({
            editChecklist: id ? id : "",
            showChecklistForm: false
        })
    }

    componentDidMount() {
        this.props.fetchItem(this.props.modals.goalContent.id) //fetch checklist from specific goal ID
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        // if (prevProps.items.length !== this.props.items.length) {
        //
        //     console.log('closing textarea');
        //     this.hideForm();
        // }


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

    render() {
        return ReactDOM.createPortal(
            <div className="ui dimmer modals visible active" onClick={(e) => {
                e.stopPropagation();
                this.onClose();
            }}>
                <div className="ui standard modal visible active" onClick={(e) => e.stopPropagation()}>
                    <i className="close icon" onClick={(e) => this.onClose()}></i>
                    <div className="header">{this.props.myProps.title}</div>

                    <div className="content">
                        {this.onRenderAlert()}

                        {this.props.myProps.content}
                        {this.props.name === "goalContent" &&


                        <div className="checklist">

                            <h4>Checklist</h4>


                            {(this.props.items.length === 0 ?
                                <p className="checklist-warning">Click on "Add" to create your checklist</p> : null)}

                            {this.props.items && this.props.items.map((item) => {

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
                                                       onClick={() => this.editChecklist(item.id)}>{item.description}</label>

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
        checklist: state.checklist
    };
};

export default connect(mapStateToProps, {
    //actions here
    toggleModal,
    fetchItem,
    changeStatus,
    deleteItem
})(Modal);

