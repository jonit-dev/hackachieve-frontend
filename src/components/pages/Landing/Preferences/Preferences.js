import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

class Preferences extends Component {

    renderInput({input, label, meta}) {
        return (
            <div className="form-group">
                <label>{label}</label>
                <input {...input} className="form-control"/>
            </div>
        )
    }

    onSubmit = (formValues) => {
        console.log(formValues);
    };

    render() {

        return (

            <div className="home_header login_header">
                <a className="mobile-logo" href=" #"><img src="/images/board/hackachieve-symbol.svg" alt="Logo"/></a>
                <div className="login-sec">
                    <h3>Preferences</h3>
                    <div className="login-inner">


                        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="login-form">
                            <Field name="title" component={this.renderInput} label="Enter title"/>
                            <Field name="description" component={this.renderInput} label="Enter description"/>

                            <button id="btnSignupForm" className="button">Submit</button>


                        </form>


                        {/*<hr></hr>*/}

                        {/*<h5 className="padding">You don’t need to decorate new passwords if you don’t want to,</h5>*/}

                        {/*<div className="login-bottom">*/}

                        {/*<div className="f-img"><a href="#"><img src="/images/login-facebook.svg" alt="Logo"*/}
                        {/*className="f-logo">*/}
                        {/*</a>*/}
                        {/*</div>*/}
                        {/*<div className="g-img">*/}
                        {/*<a href="#"><img src="/images/login-google.svg" alt="Logo" className="g-logo"></a>*/}
                        {/*</div>*/}
                        {/*</div>*/}


                    </div>
                </div>
                <div className="clear"></div>
            </div>


        );
    }
}


const validate = (formValues) => {

    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter a title'
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }
    return errors;
};

const formWrapped = reduxForm({
    form: 'Preferences',
    validate: validate
})(Preferences);

export default connect(null, {
    //some actions here
})(formWrapped)
