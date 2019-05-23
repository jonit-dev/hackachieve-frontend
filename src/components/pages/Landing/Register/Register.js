import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Alert from "../../../UI/Alert/Alert";
import {userLogin, userRegister} from "../../../../actions/authActions";
import ValidationMessage from '../../../UI/ValidationMessage/ValidationMessage';
import {Mixpanel as mixpanel} from "../../../../mixpanel";
import {Link} from "react-router-dom";

class Register extends Component {

    componentDidMount() {
        mixpanel.track('register_visit')
    }


    onSubmit = (formValues) => {

        // check if user agreed with terms of use


        if (!formValues.agreeTermsOfUse) {
            alert('Sorry, you must agree with our terms of use to create an account');
            return false;
        }


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

    renderCheckbox({type, placeholder, input, label, meta, children}) {
        return (
            <div className="field">
                <label>{label}</label>
                <div className="ui checkbox">
                    <input {...input} type={type}/>
                    <label>{children}</label>
                </div>

                {(meta.touched && meta.error ? <ValidationMessage message={meta.error}/> : null)}
            </div>
        )
    }


    render() {

        return (


            <main>

                <div className="ui text container">

                    <h1>Create your Account</h1>

                    <div className="ui divider"></div>

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

                        <Field type="checkbox" name="agreeTermsOfUse" component={this.renderCheckbox}
                               label="Terms of Use"
                               validate={required}>
                            <Link to='/terms'>
                                I agree with Hackachieve terms of use
                            </Link>
                        </Field>

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
            agreeTermsOfUse: true
        }
    };
};


export default connect(
    mapStateToProps, {
        //some actions here
        userRegister,
        userLogin
    })(formWrapped)
