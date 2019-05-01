import React, {Component} from 'react';
import * as ReactDOM from "react-dom";
import {connect} from 'react-redux'
import {toggleModal} from "../../../actions/uiActions";

class Modal extends Component {


    onClose() {
        console.log('closing modal');
        this.props.toggleModal(this.props.myProps.name); //close this modal
    }


    render() {
        return ReactDOM.createPortal(
            <div className="ui dimmer modals visible active" onClick={() => this.onClose()}>
                <div className="ui standard modal visible active" onClick={(e) => e.stopPropagation()}>
                    <i className="close icon" onClick={(e) => this.onClose()}></i>
                    <div className="header">{this.props.myProps.title}</div>
                    <div className="content">
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
        modals: state.ui.modals
    };
};

export default connect(mapStateToProps, {
    //actions here
    toggleModal
})(Modal);

