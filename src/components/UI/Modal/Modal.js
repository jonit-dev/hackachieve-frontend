import React, {Component} from 'react';
import * as ReactDOM from "react-dom";
import {connect} from 'react-redux'
import {toggleModal} from "../../../actions/uiActions";
import Alert from "../Alert/Alert";

class Modal extends Component {


    onClose() {
        this.props.toggleModal(this.props.myProps.name); //close this modal
    }

    onRenderAlert() {
        return (this.props.alert.type ? <Alert type={this.props.alert.type} title={this.props.alert.title}
                                               content={this.props.alert.content}/> : null)
    }

    render() {
        return ReactDOM.createPortal(
            <div className="ui dimmer modals visible active" onClick={() => this.onClose()}>
                <div className="ui standard modal visible active" onClick={(e) => e.stopPropagation()}>
                    <i className="close icon" onClick={(e) => this.onClose()}></i>
                    <div className="header">{this.props.myProps.title}</div>

                    <div className="content">
                        {this.onRenderAlert()}

                        {this.props.myProps.content}
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
        modals: state.ui.modals
    };
};

export default connect(mapStateToProps, {
    //actions here
    toggleModal
})(Modal);

