import React, {Component} from 'react';

class Register extends Component {

    render() {

        return (
            <main>

                <div className="ui text container">

                    <h1>Create your Account</h1>

                    {/*{(this.state.message.title ?*/}
                        {/*<Message title={this.state.message.title} description={this.state.message.description}*/}
                                 {/*status={this.state.message.status}/> : null)}*/}

                    <form className="ui form">
                        <div className="field">
                            <label>First Name</label>
                            <input type="text" name="firstName" placeholder="First Name"/>
                        </div>
                        <div className="field">
                            <label>Last Name</label>
                            <input type="text" name="lastName" placeholder="Last Name" />
                        </div>
                        <div className="field">
                            <label>Email</label>
                            <input type="email" name="email" placeholder="E-mail" />
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input type="password" name="password" placeholder="Password" />
                        </div>
                        {/*<div className="field">*/}
                            {/*<div className="ui checkbox">*/}
                                {/*<input type="checkbox" tabIndex="0"/>*/}
                                {/*<label>I agree to the Terms and Conditions</label>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        <button className="ui button" type="submit">Register
                        </button>
                    </form>
                </div>
            </main>
        )
    }
}

export default Register;