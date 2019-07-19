import React from 'react';

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            userEmail: '',
            userPassword: '',
            userName: ''
        }
    }

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

    onNameChange = (event) => {
        this.setState({
            userName: event.target.value
        })
    }

    onSubmit = () => {
        const {userEmail, userPassword, userName} = this.state;
        if(!userEmail || !userPassword || !userName) {
            return console.log('Registration error');
        }
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                email: this.state.userEmail,
                password: this.state.userPassword,
                name: this.state.userName
            })
        })
        .then(response => response.json())
        .then(user=> {
            if(user.id) {
                this.props.loadUser(user);
                this.props.onClick('home');
            }
        })
    }

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5"> 
                <main className="pa4 black-80 center">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0 center">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email"
                                onChange={this.onNameChange} name="name"  id="name"/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email"
                                onChange={this.onEmailChange} name="email-address"  id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password"
                                onChange={this.onPasswordChange} name="password"  id="password"/>
                            </div>
                        </fieldset>
                        <div className="center">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit"
                             value="Register" onClick={this.onSubmit}/>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default RegistrationForm;