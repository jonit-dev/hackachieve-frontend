import React, {Component} from 'react';

// import AddShortTermGoalPartial from "../../UI/Modal/AddShortTermGoalPartial";

class Modal extends Component {

    state = {
        title: this.props.title,

        description: this.props.description,
        cancelButton: this.props.cancelButton,
        confirmButton: this.props.confirmButton,
        visible: this.props.visible,
        onOpenShortTermGoalModal: null,
        onOpenMainGoalModal: null,
        hasActions: false,

    };

    onComponentDidMount() {

    }

    rawDescription() {
        //This function is used to show special html tags on modal body. Make sure this content is only coming from server, otherwise we'll open a security vulnerability

        var rawMarkup = this.state.description;
        return {__html: rawMarkup};
    }

    closeModal() {
        console.log("closing modal");

        //close modal
        this.setState({visible: false});
        if (this.props.onOpenMainGoalModal) {
            this.props.onOpenMainGoalModal();
        }

        if (this.props.onOpenShortTermGoalModal) {
            this.props.onOpenShortTermGoalModal();
        }

    }


    setModalVisibility(shadow = null) {
        if (this.state.visible) {

            if (!shadow) {
                return "visible active";
            } else {
                return "active"
            }

        } else {
            return "";
        }
    }

    render() {

        return <React.Fragment>

            <div className={`hackachieve-modal ui dimmer modals page transition ${this.setModalVisibility(true)}`}>
                <div className={`ui tiny test modal transition ${this.setModalVisibility()}`}>
                    <i className="close icon" onClick={() => {
                        this.closeModal()
                    }}/>
                    <div className="header">
                        {this.state.title}
                    </div>
                    <div className="content">

                        <span dangerouslySetInnerHTML={this.rawDescription()}/>

                        {(this.props.children ? this.props.children : null)}

                    </div>
                    {(this.state.hasActions ? <div className="actions">
                        <div className="ui black deny button">
                            {this.state.cancelButton}
                        </div>
                        <div className="ui positive button">
                            {this.state.confirmButton}
                        </div>
                    </div> : null)}
                </div>

            </div>


        </React.Fragment>


    }
}

export default Modal;