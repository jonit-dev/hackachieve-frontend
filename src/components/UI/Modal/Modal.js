import React, { Component } from 'react';
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { toggleModal, clearAlert } from "../../../actions/uiActions";
import Alert from "../Alert/Alert";
import CheckList from "../../UI/forms/CheckList";
import { fetchItem, changeStatus, deleteItem } from "../../../actions/checkListAction";
import cogoToast from 'cogo-toast';

class Modal extends Component {
    state = {
        showChecklistForm: false,
        //status: true,
        editChecklist: ''
    };

    onClose() {
        this.props.toggleModal(this.props.myProps.name); //close this modal
    }

    componentWillReceiveProps(newProps) {
        if (newProps.alert.type && newProps.alert.type === "positive") {
            cogoToast.success(newProps.alert.content)
            this.props.clearAlert()
        }
    }

    onRenderAlert() {
        return (this.props.alert.type && this.props.alert.type === 'negative' ? <Alert type={this.props.alert.type} title={this.props.alert.title}
            content={this.props.alert.content} /> : null)
    }

    handleClick = () => {
        this.setState({
            showChecklistForm: !this.state.showChecklistForm,
            editChecklist: ''
        })
    };

    closeForm=(closeForm)=>{
        this.setState({
            showChecklistForm: closeForm,
            editChecklist: ''
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

    render() {
        return ReactDOM.createPortal(
            <div className="ui dimmer modals visible active" onClick={(e) => {
                e.stopPropagation();
                this.onClose();
                
            }}>
                <div className="ui  modal  active main-div" onClick={(e) => e.stopPropagation()} >
                   

                    <div className="content">
                        {this.onRenderAlert()}

                        {this.props.myProps.content}
                        {this.props.name === "goalContent" &&


                            <div className="checklist">

                                <h3>Checklist</h3>


                                {(this.props.items.length === 0 ?

                                    <p className="checklist-warning">Click on "Add" to create your checklist</p> : null)}

                                {
                                    // eslint-disable-next-line
                                    this.props.items && this.props.items.map((item) => {

                                        if (item.id) {
                                            return (
                                                <div className="checklist-item" key={item.id}>
                                                    <div className="ui checkbox">
                                                        {this.state.editChecklist === item.id ? <>
                                                            <CheckList
                                                                goal_id={this.props.modals.goalContent.id}
                                                                item={item}
                                                                hideForm={this.hideForm} />


                                                            <i className="edit icon"
                                                                onClick={() => this.editChecklist()}> </i> </> : <>
                                                                <label className="check-main" style={item.status ? { textDecoration: "line-through" } : {}}
                                                                ><span onClick={() => this.editChecklist(item.id)}>{item.description}</span>
                                                                    <input type="checkbox" name="example" 
                                                                        onClick={() => this.changeStatus(item)}
                                                                        defaultChecked={item.status} />
                                                                    <span className="checkmark"></span>
                                                                </label>
                                                                <i className="close icon"
                                                                    onClick={() => this.deleteItem(item)}> </i> </>
                                                        }
                                                    </div>
                                                </div>)
                                        }


                                    }
                                    )
                                }

                                <div className="checklist-action-area">

                                    {!this.state.showChecklistForm &&
                                        <a className="add-task" href="# " onClick={this.handleClick} ><img src="images/icons/plus-white.svg" alt="" /> Add New Work</a>
                                    }
                                    {this.state.showChecklistForm && <div style={{ display: "inline-block" }}>
                                        <CheckList goal_id={this.props.modals.goalContent.id} showChecklistForm={this.state.showChecklistForm} closeForm={this.closeForm} />
                                    </div>}

                                </div>

                            </div>
                        }
                        <div className="comment-sec">
                            <h3>Comments (1) <img src="images/icons/chevron-up.svg" alt="" /></h3>
                            <div className="cooment-left">
                                <a href="# " className="up-arrow"><img src="images/icons/chevron-up.svg" alt="" /></a>
                                <span className="count">2</span>
                                <a href="# " className="down-arrow"><img src="images/icons/chevron-up.svg" alt="" /></a>
                            </div>
                            <div className="cooment-right">
                                <div className="comment-client">
                                    <img src="images/img.png" alt="" />
                                    <h4>Danielle Powell</h4>
                                    <span className="time">13:00 PM</span>
                                </div>
                                <div className="client-text">
                                    <p>Vivamus eget aliquam dui. Integer eu arcu vel arcu suscipit ultrices quis non mauris. Aenean scelerisque, sem eu dictum commodo, velit nisi blandit magna, quis scelerisque ipsum lectus ut libero. Sed elit diam, dignissim ac congue quis, aliquam in purus.</p></div>
                            </div>
                        </div>

                        <div className="leave-comment">
                            <div className="send-user"><img src="images/img2.png" alt="" /></div>
                            <div className="comment-box">
                                <textarea className="textarea" placeholder="Leave a comment..."></textarea>
                                <a className="send-mesage" href="# " ><img src="images/icons/send.svg" alt="" /></a>
                            </div>


                        </div>
                    </div>
                    <div className="actions">
                        {this.props.myProps.actions}
                    </div>

                </div>
                <div className="popup-btns">
                    <a href="# " className="close" onClick={(e) => {
                        e.stopPropagation();
                        this.onClose();
                    }}><img className="popup_img" src="images/icons/x.svg" alt="" /></a>
                    <br></br>
                    <a href="# " className="upload"><img className="popup_img" src="images/icons/upload.svg" alt="" /></a>
                    <br></br>
                    <a href="# " className="more"><img className="popup_img" src="images/icons/more-vertical.svg" alt="" /></a>
                </div>
            </div>
            , document.querySelector('#modal'))
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
    deleteItem,
    clearAlert
})(Modal);

