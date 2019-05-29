import React, {Component} from 'react';
import * as ReactDOM from "react-dom";
import {connect} from 'react-redux'
import {toggleModal} from "../../../actions/uiActions";
import Alert from "../Alert/Alert";
import CheckList from "../../UI/forms/CheckList";


class Modal extends Component {
    state = {
        showChecklistForm: false
    }

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
            showChecklistForm: !this.state.showChecklistForm 
        })
    }

    render() {
        console.log(this.props)
        return ReactDOM.createPortal(
            <div className="ui dimmer modals visible active" onClick={(e) => {e.stopPropagation(); this.onClose();}}>
                <div className="ui standard modal visible active" onClick={(e) => e.stopPropagation()}>
                    <i className="close icon" onClick={(e) => this.onClose()}></i>
                    <div className="header">{this.props.myProps.title}</div>

                    <div className="content">
                        {this.onRenderAlert()}

                        {this.props.myProps.content}
                        <div className="checklist">
                            <h4>Checklist</h4>
                            {!this.state.showChecklistForm &&
                            <button className="ui button" onClick={this.handleClick}>Add an item</button>
                            }
                            {this.state.showChecklistForm && <div>
                                <CheckList goal_id={this.props.modals.goalContent.id}/>
                                <button className="ui button" onClick={this.handleClick}>X</button>
                            </div> }
                        </div> 
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

