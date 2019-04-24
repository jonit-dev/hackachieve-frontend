import React, {Component} from 'react';
import {connect} from 'react-redux'
import {clearAlert} from "../../actions";

class Alert extends Component {

    componentDidMount() {
        //set time out to auto clear message

        window.setTimeout(() => {
            this.props.clearAlert();
        }, 4000);


    }

    render() {
        return (
            <React.Fragment>
                <div className={`ui ${this.props.alert.type} message`}>
                    <i className="close icon"></i>
                    <div className="header">
                        {this.props.alert.title}
                    </div>
                    {this.props.alert.content}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {alert: state.alert.message};
};

export default connect(mapStateToProps, {
    //actions here
    clearAlert
})(Alert);

