import React, {Component} from 'react';
import * as ReactDOM from "react-dom";
import {connect} from 'react-redux'
import {toggleModal, clearAlert} from "../../../actions/uiActions";
import Alert from "../Alert/Alert";
import cogoToast from 'cogo-toast';


class Modal extends Component {


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
                   content={this.props.alert.content}/> : null)
    }


    render() {
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


                        { /*
                            <div className="comment-sec">
                                <h3>Comments (1) <img src="images/icons/chevron-up.svg" alt=""/></h3>
                                <div className="cooment-left">
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
                                </div>
                            </div>

                            < div className="leave-comment">
                            <div className="send-user"><img src="images/img2.png" alt="" /></div>
                            <div className="comment-box">
                            <textarea className="textarea" placeholder="Leave a comment..."></textarea>
                            <a className="send-mesage" href="# " ><img src="images/icons/send.svg" alt="" /></a>
                            </div>


                            </div>

                       */}
                    </div>
                    <div className="actions">
                        {this.props.myProps.actions}
                    </div>

                </div>
                <div className="popup-btns">
                    <a href="# " className="close" onClick={(e) => {
                        e.stopPropagation();
                        this.onClose();
                    }}><img className="popup_img" src="images/icons/x.svg" alt=""/></a>
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
    clearAlert
})(Modal);

