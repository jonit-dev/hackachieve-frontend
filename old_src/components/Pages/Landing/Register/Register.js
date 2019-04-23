import React, {Component} from 'react';
import Message from '../../../UI/Message/Message';
import User from '../../../../classes/User'

class Register extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        error: "",
        isEnabled: false,
        message: {
            title: "",
            description: "",
            status: ""
        }
    };

    handleSubmit = this.handleSubmit.bind(this);
    handleChange = this.handleChange.bind(this);


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

        /* VALIDATION =========================================== */

        // Check if all fields were filled correctly

        if (this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.email.length > 0 && this.state.password.length > 0 && this.state.email.includes('@')) {
            this.setState({isEnabled: true})
        }


    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.isEnabled) {
            let user = { //need to run with backend path or run backend locally and use proxy
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            }; //create user object for submission

            User.register(user).then((data) => {

                this.setState(data); //pass server message to our state

                setTimeout(() => {
                    this.setState({message: {title: "", description: "", status: ""}});
                }, 3000);
            });


            this.setState({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                error: ""
            });
        } else {
            this.setState({error: "Invalid Field Inputs"})
        }
    }

    render() {

        return (
            <main>


                <div className="ui text container">

                    <h1>Create your Account</h1>

                    {(this.state.message.title ?
                        <Message title={this.state.message.title} description={this.state.message.description}
                                 status={this.state.message.status}/> : null)}

                    <form className="ui form">
                        <div className="field">
                            <label>First Name</label>
                            <input type="text" name="firstName" placeholder="First Name" value={this.state.firstName}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="field">
                            <label>Last Name</label>
                            <input type="text" name="lastName" placeholder="Last Name" value={this.state.lastName}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="field">
                            <label>Email</label>
                            <input type="email" name="email" placeholder="E-mail" value={this.state.email}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input type="password" name="password" placeholder="Password" value={this.state.password}
                                   onChange={this.handleChange}/>
                        </div>
                        {/*<div className="field">*/}
                            {/*<div className="ui checkbox">*/}
                                {/*<input type="checkbox" tabIndex="0"/>*/}
                                {/*<label>I agree to the Terms and Conditions</label>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        <button disabled={!this.state.isEnabled} className="ui button" type="submit"
                                onClick={this.handleSubmit}>Register
                        </button>
                    </form>
                </div>
            </main>
        )
    }
}

export default Register;