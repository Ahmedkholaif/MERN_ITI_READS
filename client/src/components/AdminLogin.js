import React, {Component} from 'react';
import {  Button, FormGroup,Input } from 'reactstrap';
import propTypes from "prop-types";
import '../css/AdminLogin.css'
import axios from 'axios';

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginData: {
				email: "",
				password: ""
			},
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;

		const { loginData } = this.state;

        this.setState({
            loginData : { ...loginData, [name]: value }
        });
            
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.handleLoginOpertion();
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length;
    }

    handleLoginOpertion = ()=> {
      
        const { loginData } = this.state;
        console.log(loginData);

        axios.post("/api/admin",loginData )
        .then(res => {
            console.log(res);
            if(res.status === 200){
                localStorage.setItem("token",res.headers["x-auth"]);
                this.props.history.push('/admin/dashboard');
                //route to admin dash board
                this.setState({
                    isLoaded: true,
                })
            } 
            }
        )
        .catch(error => console.error(error))
    }


    render() {
        return (
            <div className='AdminLogin'>
            
                <h1><mark>Adminstrator Login</mark></h1>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Input required type="email" name="email" id="Email" placeholder="email" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Input required type="password" name="password" id="Password" placeholder="Password" onChange={this.handleChange} />
                    </FormGroup>
                    <Button color='primary' size='lg' block type="submit">Login</Button>
                </form>
            </div>
        );
    }
}

AdminLogin.propTypes = {
    submit: propTypes.func.isRequired,
    isUserExists: propTypes.func.isRequired,
  
    users: propTypes.arrayOf(
      propTypes.shape({
        email: propTypes.string.isRequired
      }).isRequired
    ),
  
    history: propTypes.shape({
      push: propTypes.func.isRequired
    }).isRequired
  };
export default AdminLogin;