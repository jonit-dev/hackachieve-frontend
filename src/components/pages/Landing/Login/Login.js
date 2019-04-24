import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {userLogin} from "../../../../actions/authActions";
import Alert from "../../../UI/Alert";

class Login extends Component {

    renderInput({input, label, meta}) {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input}/>
            </div>
        )
    }

    onSubmit = (formValues) => {
        console.log('Form reducer: starting user login!');
        console.log(formValues);
        this.props.userLogin(formValues); //login our user with credentials
    };

    onRenderAlert() {
        return (this.props.alert.type ? <Alert type={this.props.alert.type} title={this.props.alert.title}
                                               content={this.props.alert.content}/> : null)
    }


    render() {

        return (
            <main>

                <div className="ui text container">

                    <h1>Login</h1>

                    {this.onRenderAlert()}

                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">

                        <Field name="email" type="email" placeholder="E-mail" component={this.renderInput}
                               label="Email"/>
                        <Field name="password" type="password" placeholder="Password" component={this.renderInput}
                               label="Your password"/>

                        <button className="ui button" type="submit">Login</button>

                    </form>


                </div>


            </main>


        );
    }
}

const formWrapped = reduxForm({
    form: 'Login',
})(Login);


const mapStateToProps = (state) => {
    return {alert: state.alert.message};
};

export default connect(mapStateToProps, {
    userLogin
})(formWrapped)
