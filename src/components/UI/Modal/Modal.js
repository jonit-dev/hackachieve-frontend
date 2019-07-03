import React, { Component } from 'react';
import * as ReactDOM from "react-dom";
import _ from 'lodash';
import { connect } from 'react-redux'
import { toggleModal, clearAlert } from "../../../actions/uiActions";
import Alert from "../Alert/Alert";
import cogoToast from 'cogo-toast';
import { loadComments, createComment, userInfo, DeleteComments, UpdateComments, CommentsVote} from "../../../actions/commentaction";



class Modal extends Component {
    commentdt = [];
    constructor(props) {
        super(props);
        this.state = {
            commentstxt: '',
            updatebox: false,
            cdt: [],
            userinfo: []
        };

        this.handleCreateChange = this.handleCreateChange.bind(this);
        this.handleUpdateChange = this.handleUpdateChange.bind(this);

    }
    componentDidMount() {

        this.props.userInfo().then((response) => {
            this.setState({ userinfo: response });
            this.loadcomment()
        });

    }
    /*#############################################################|

                            >>>>  WARNING <<<<<

    YOU CAN ONLY ADD TO THIS COMPONENT FUNCIONALITIES THAT ARE >> SHARED <<
    AMONG ALL OTHER MODALS (like the close button, etc).
    IF THE FUNCTIONALITY THAT YOU WANT TO CREATE IS NOT SUPPOSED
    TO APPEAR IN EVERY MODAL, DO NOT ADD IT HERE.

    THANK YOU

    *##############################################################*/



    onClose() {
        this.props.toggleModal(this.props.myProps.name); //close this modal
    }

    componentWillReceiveProps(newProps) {
        if (newProps.alert.type && newProps.alert.type === "positive") {
            cogoToast.success(newProps.alert.content);
            this.props.clearAlert()
        }
    }

    onRenderAlert() {
        return (this.props.alert.type && this.props.alert.type === 'negative' ?
            <Alert type={this.props.alert.type} title={this.props.alert.title}
                content={this.props.alert.content} /> : null)
    }

    //############### comment realated functions #################
    loadcomment() {
        if (this.props.goalid) {
            this.props.loadComments(this.props.goalid).then((response) => {
                this.setState({ cdt: response });
            });
        }
    }

    handleCreateChange(event) {
        this.setState({ commentstxt: event.target.value });
    }

    handleUpdateChange(event) {
        this.setState({ commentupdatedtext: event.target.value })
    }

    AddComments() {
        if (!this.state.commentstxt) {
            cogoToast.error("Please Write Comments First");
        }
        else {
            let commentdata = {
                text: this.state.commentstxt,
                vote: "0",
                goal: this.props.goalid
            }

            this.props.createComment(commentdata).then((response) => {
                this.setState({ commentstxt: "" });
                this.loadcomment()
            });
        }

    }

    DeleteComments(commentid) {
        this.props.DeleteComments(commentid).then((response) => {
            this.loadcomment();
        });
    }
    UpdateCommentsbox(commentid, commenttext) {
        this.setState({ updatebox: true, Comment_id: commentid, commentupdatedtext: commenttext });
    }
    UpdateComments(id) {
        let updated = {
            text: this.state.commentupdatedtext
        }
        this.props.UpdateComments(id, updated).then((response) => {
            this.setState({ updatebox: false });
            this.loadcomment();
        });
    }
    UpvoteComments(commentid){
        let vote ={
            upvote: "1",
            downvote: "0",
            comment: commentid
         }
         this.props.CommentsVote(vote).then((response) => {
            this.loadcomment();
        });
        
    }
    DownvoteComments(commentid){
        let vote ={
            upvote: "0",
            downvote: "1",
            comment: commentid
         }
         this.props.CommentsVote(vote).then((response) => {
            this.loadcomment();
        });
    }

    render() {
        const { updatebox, Comment_id } = this.state;
        const commentcontent = this.state.cdt.map((comment, i) =>
        <div className="comment-sec" key={comment.id}>
        {/* {console.log(comment.voting[0])} */}
            <div className="cooment-left">
                <a href="# " onClick={() => this.UpvoteComments(comment.id)} className="up-arrow"><img src="images/icons/chevron-up.svg" alt=""/></a>
                {comment.voting[0] === undefined ? <span className="count">{0}</span> : <span className="count">{comment.voting[0].upvote}</span>}        
                <a href="# " onClick={() => this.DownvoteComments(comment.id)} className="down-arrow"><img src="images/icons/chevron-up.svg" alt=""/></a>
            </div>
            <div className="cooment-right">
                <div className="comment-client">
                    <img src="images/icons/avatar-generic.svg" alt="" />
                    <h4>{comment.user.first_name + " " + comment.user.last_name}</h4>
                    <span className="time">13:00 PM</span>
                </div>
                <div className="client-text" style={{ display: updatebox === true && comment.id === Comment_id ?  'none': 'block' }}>
                    <p>{comment.text}</p> 
                </div>
                {_.isEqual(comment.user, this.state.userinfo) ?
                    <div>
                        <div style={{ float: "right" }}><button className="cancel" onClick={() => this.DeleteComments(comment.id)}
                        >Delete</button> <button style={{ margin: "0px" }} className="add-task" onClick={() => this.UpdateCommentsbox(comment.id, comment.text)}>Update</button></div>
                        <div style={{ display: updatebox === true && comment.id === Comment_id ? 'block' : 'none' }}>
                            <textarea style={{ width: "70%", borderRadius: "20px"}} value={this.state.commentupdatedtext} onChange={this.handleUpdateChange} className="textarea" ></textarea>
                            <button className="add-task" onClick={() => this.UpdateComments(comment.id)}>Save</button>
                        </div>
                    </div>
                    : null}
            </div>
        </div>
        );


        return ReactDOM.createPortal(
            <div className="ui dimmer modals visible active" onClick={(e) => {
                e.stopPropagation();
                this.onClose();

            }}>


                <div className="ui  modal  active main-div" onClick={(e) => e.stopPropagation()}>


                    <div className="content">

                        <div className="pop-inner">
                            <h2>{this.props.myProps.title}</h2>
                        </div>


                        {this.onRenderAlert()}

                        {this.props.myProps.content}



                        <div className="comment-sec">
                            <h3>Comments ({this.state.cdt.length}) <img src="images/icons/chevron-up.svg" alt="" /></h3>
                            {/* <div className="cooment-left">
                                    <a href="# " className="up-arrow"><img src="images/icons/chevron-up.svg"
                                                                           alt=""/></a>
                                    <span className="count">2</span>
                                    <a href="# " className="down-arrow"><img src="images/icons/chevron-up.svg" alt=""/></a>
                                </div>

                            <div className="cooment-right">
                                    <div className="comment-client">
                                        <img src="images/img.png" alt=""/>
                                        <h4>Danielle Powell</h4>
                                        <span className="time">13:00 PM</span>
                                    </div>
                                    <div className="client-text">
                                        <p>Vivamus eget aliquam dui. Integer eu arcu vel arcu suscipit ultrices quis non
                                            mauris. Aenean scelerisque, sem eu dictum commodo, velit nisi blandit magna,
                                            quis scelerisque ipsum lectus ut libero. Sed elit diam, dignissim ac congue
                                            quis, aliquam in purus.</p></div>
                                </div> */}
                                <ul>{commentcontent}</ul>

                        </div>


                        < div className="leave-comment">
                            <div className="send-user"><img src="images/img2.png" alt="" /></div>
                            <div className="comment-box">
                                <textarea className="textarea" placeholder="Comment Hear" value={this.state.commentstxt} onChange={this.handleCreateChange}></textarea>
                                <a className="send-mesage" href="# " onClick={() => this.AddComments()}><img alt="" src="images/icons/send.svg" /></a>
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
                    {/*<a href="# " className="upload"><img className="popup_img" src="images/icons/upload.svg" alt="" /></a>*/}
                    {/*<br></br>*/}
                    {/*<a href="# " className="more"><img className="popup_img" src="images/icons/more-vertical.svg" alt="" /></a>*/}
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
    };
};


export default connect(mapStateToProps, {
    toggleModal,
    clearAlert,
    createComment,
    loadComments,
    userInfo,
    DeleteComments,
    UpdateComments,
    CommentsVote
})(Modal);

