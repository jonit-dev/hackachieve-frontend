import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Alert from "../../../UI/Alert";
import {userLogin, userRegister} from "../../../../actions/authActions";
import ValidationMessage from '../../../UI/ValidationMessage';

class Register extends Component {


    onSubmit = (formValues) => {

        console.log(formValues);

        this.props.userRegister(formValues).then(() => { //first register it


            if (this.props.canRedirectLogin) { //if everything is ok, this variable will be changed to true

                setTimeout(() => {
                    this.props.userLogin({ //login user with same information!
                        email: formValues.email,
                        password: formValues.password
                    });

                }, 3000);
            }
        });

    };


    onRenderAlert() {
        return (this.props.alert.type ? <Alert type={this.props.alert.type} title={this.props.alert.title}
                                               content={this.props.alert.content}/> : null)
    }


    renderInput({type, placeholder, input, label, meta}) {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type}/>
                {(meta.touched && meta.error ? <ValidationMessage message={meta.error}/> : null)}
            </div>
        )
    }

    render() {

        return (


            <main>

                <div className="ui text container">

                    <h1>Create your Account</h1>

                    {this.onRenderAlert()}

                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">

                        <Field name="firstName" component={this.renderInput} label="First name"
                               placeholder="First name" type="text" validate={required}/>

                        <Field name="lastName" component={this.renderInput} label="Last name"
                               placeholder="Last name" type="text" validate={required}/>

                        <Field type="email" name="email" component={this.renderInput} label="Email"
                               placeholder="Email" validate={required}/>

                        <Field type="password" name="password" component={this.renderInput} label="Password"
                               placeholder="Password" validate={required}/>

                        {/*<div className="field">*/}
                        {/*<div className="ui checkbox">*/}
                        {/*<input type="checkbox" tabIndex="0"/>*/}
                        {/*<label>I agree to the Terms and Conditions</label>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                        <button className="ui button positive" disabled={!this.props.valid} type="submit">Register
                        </button>
                    </form>
                </div>
            </main>
        );
    }
}

const required = v => {
    if (!v || v === '') {
        return "This field is required"
    }
    return undefined;
};


const formWrapped = reduxForm({
    form: 'Register',
    enableReinitialize: true
})(Register);

const mapStateToProps = (state) => {
    return {
        canRedirectLogin: state.auth.canRedirectLogin,
        alert: state.alert.message,
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }
    };
};


export default connect(
    mapStateToProps, {
        //some actions here
        userRegister,
        userLogin
    })(formWrapped)
