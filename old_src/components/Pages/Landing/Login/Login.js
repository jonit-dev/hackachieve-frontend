import React, {Component} from 'react';
import User from '../../../../classes/User'
import Message from "../../../UI/Message/Message";

class Login extends Component {

    state = {
        email: "",
        password: "",
        message: {
            title: "",
            description: "",
            status: ""
        }
    };

    onFormSubmit(event) {

        event.preventDefault();
        console.log('logging user');
        console.log(this.state);

        User.login(this.state).then((response) => {

            if (response.access) {
                let token = response.access;
                console.log("User logged in!");
                console.log(token);
                localStorage.setItem('user', JSON.stringify({
                    'token': token,
                    'email': this.state.email
                }));

                this.setState({
                    message: {
                        title: "Welcome back",
                        description: "You're now logged in!",
                        status: "success"
                    }
                });

                setTimeout(() => {
                    window.location.href = '/board';
                },2000);




            }
        }, (error) => {
            this.setState({
                message: {
                    title: "Oops!",
                    description: "Invalid credentials",
                    status: "error"
                }
            })

        });
    }

    render() {
        return (
            <main>

                <div className="ui text container">

                    <h1>Login</h1>


                    {(this.state.message.title ?
                        <Message title={this.state.message.title} description={this.state.message.description}
                                 status={this.state.message.status}/> : null)}


                    <form className="ui form" onSubmit={(event) => {
                        this.onFormSubmit(event)
                    }}>
                        <div className="field">
                            <label>Email</label>
                            <input type="email" value={this.state.email}
                                   onChange={(e) => this.setState({email: e.target.value})} name="email"
                                   placeholder="E-mail"/>
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input type="password" value={this.state.password}
                                   onChange={(e) => this.setState({password: e.target.value})} name="password"
                                   placeholder="Password"/>
                        </div>
                        <button className="ui button" type="submit">Login</button>
                    </form>

                </div>


            </main>
        );
    }
}

export default Login;