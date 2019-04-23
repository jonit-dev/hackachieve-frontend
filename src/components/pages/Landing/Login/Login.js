import React, {Component} from 'react';


class Login extends Component {


    render() {
        return (
            <main>

                <div className="ui text container">

                    <h1>Login</h1>


                    {/*{(this.state.message.title ?*/}
                    {/*<Message title={this.state.message.title} description={this.state.message.description}*/}
                    {/*status={this.state.message.status}/> : null)}*/}


                    <form className="ui form">
                        <div className="field">
                            <label>Email</label>
                            <input type="email"
                                   name="email"
                                   placeholder="E-mail"/>
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input type="password"
                                   name="password"
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