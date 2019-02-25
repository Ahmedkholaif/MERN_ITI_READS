import React, {Component} from 'react';
import {  Button, FormGroup,Input } from 'reactstrap';
import '../css/AdminLogin.css'

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.handleLoginOpertion();
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length;
    }

    handleLoginOpertion() {
        let loginObject = {
            email: this.state.email,
            password: this.state.password
        };

        fetch("/", {
            header: {
                "Content-Type": "application/json"
            }, method: "POST",
            body: JSON.stringify(loginObject)
        }).then(
            res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw Error(res.statusText);
                }
            }
        ).then(json => {
            this.setState({
                isLoaded: true,
                token: json
            })
        }).catch(error => console.error(error))
    }


    render() {
        return (
            <div className='AdminLogin'>
                <h1><mark>Adminstrator Login</mark></h1>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Input required type="email" name="email" id="Email" placeholder="email" onChange={this.state.email} />
                    </FormGroup>
                    <FormGroup>
                        <Input required type="password" name="password" id="Password" placeholder="Password" onChange={this.state.password} />
                    </FormGroup>
                    <Button color='primary' size='lg' block type="submit">Login</Button>
                </form>
            </div>
        );
    }
}

export default AdminLogin;