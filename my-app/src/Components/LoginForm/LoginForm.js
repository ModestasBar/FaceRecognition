import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: '',
            userPassword: ''
        }
        
    }
    
    // componentDidMount() {
    //     fetch('http://localhost:3000')
    //     .then(response => response.json())
    //     .then(console.log);
    // }

    onEmailChange = (event) => {
        this.setState({
            userEmail: event.target.value
        })
    }

    onPasswordChange = (event) => {
        this.setState({
            userPassword: event.target.value
        })
    }

    onSubmit = () => {
        fetch('http://localhost:3000/sign', {
            method: 'post',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                email: this.state.userEmail,
                password: this.state.userPassword  
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.id) {
                this.props.loadUser(data);
                this.props.onClick('home');
            }
        })
    }

    render() {

        return (
            <article className="br3 ba b--black-10 mt4 w-100 w-50-m w-25-l mw5 center shadow-5"> 
                <main className="pa4 black-80 center">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0 center">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"
                                onChange={this.onEmailChange}  id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"
                                onChange={this.onPasswordChange}  id="password"/>
                            </div>
                        </fieldset>
                        <div className="center">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={this.onSubmit}/>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default LoginForm;