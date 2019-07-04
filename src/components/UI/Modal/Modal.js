import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { toggleModal, clearAlert } from "../../../actions/uiActions";
import Alert from "../Alert/Alert";
import cogoToast from "cogo-toast";

class Modal extends Component {
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
      this.props.clearAlert();
    }
  }

  onRenderAlert() {
    return this.props.alert.type && this.props.alert.type === "negative" ? (
      <Alert
        type={this.props.alert.type}
        title={this.props.alert.title}
        content={this.props.alert.content}
      />
    ) : null;
  }

  render() {
    

    return ReactDOM.createPortal(
      <div
        className="ui dimmer modals visible active"
        onClick={e => {
          e.stopPropagation();
          this.onClose();
        }}
      >
        <div
          className="ui  modal  active main-div"
          onClick={e => e.stopPropagation()}
        >
          <div className="content">
            <div className="pop-inner">
              <h2>{this.props.myProps.title}</h2>
            </div>

            {this.onRenderAlert()}
                
                {this.props.myProps.content}
                {this.props.myProps.comment}

          </div>
          <div className="actions">{this.props.myProps.actions}</div>
        </div>
        <div className="popup-btns">
          <a
            href="# "
            className="close"
            onClick={e => {
              e.stopPropagation();
              this.onClose();
            }}
          >
            <img className="popup_img" src="images/icons/x.svg" alt="" />
          </a>
          <br></br>
          {/*<a href="# " className="upload"><img className="popup_img" src="images/icons/upload.svg" alt="" /></a>*/}
          {/*<br></br>*/}
          {/*<a href="# " className="more"><img className="popup_img" src="images/icons/more-vertical.svg" alt="" /></a>*/}
        </div>
      </div>,
      document.querySelector("#modal")
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    myProps: ownProps,
    alert: state.alert.message,
    modals: state.ui.modals
  };
};

export default connect(
  mapStateToProps,
  {
    toggleModal,
    clearAlert
  }
)(Modal);
