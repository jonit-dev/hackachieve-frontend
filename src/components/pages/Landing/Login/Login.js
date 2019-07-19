import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { userLogin } from "../../../../actions/authActions";
import Alert from "../../../UI/Alert/Alert";
import cogoToast from "cogo-toast";
import { clearAlert } from "../../../../actions/uiActions";
import Analytics from "../../../../analytics/Analytics";
import { Helmet } from "react-helmet";
class Login extends Component {
  componentDidMount() {
    Analytics.track("login_visit", {
      eventCategory: "pages",
      eventAction: "login_visit"
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.alert.type && newProps.alert.type === "positive") {
      cogoToast.success(newProps.alert.content);
      this.props.clearAlert();
    }
  }

  renderInput({ placeholder, input, label, meta, type }) {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} placeholder={placeholder} type={type} />
      </div>
    );
  }

  onSubmit = formValues => {
    this.props.userLogin(formValues); //login our user with credentials
  };

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
    return (
      <React.Fragment>
        <Helmet>
          <title>Hackachieve Login | Goal Setting and Management Tool</title>
          <meta
            name="description"
            content="Hackachieve helps you manage and organize long term and short term goals online. Login to explore various goal
tracking features available online for free."
          />
        </Helmet>

        <div className="site-wrap internal-page">
          <div className="ui text container">
            <h1>Login</h1>

            <div className="ui divider"></div>

            {this.onRenderAlert()}

            <form
              onSubmit={this.props.handleSubmit(this.onSubmit)}
              className="ui form"
            >
              <Field
                name="email"
                type="email"
                placeholder="E-mail"
                component={this.renderInput}
                label="Email"
              />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                component={this.renderInput}
                label="Your password"
              />

              <button className="ui button" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const formWrapped = reduxForm({
  form: "Login"
})(Login);

const mapStateToProps = state => {
  return { alert: state.alert.message };
};

export default connect(
  mapStateToProps,
  {
    userLogin,
    clearAlert
  }
)(formWrapped);
