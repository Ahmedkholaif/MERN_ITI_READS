import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import propTypes from 'prop-types';
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {

		super(props);

		this.initialState = {

			loginData: {
				email: "",
				password: ""
			},

			errors: {}
		};

		this.state = this.initialState;

		this.state = this.initialState;
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validate = this.validate.bind(this);

	}

	handleChange(event) {

		const { name, value } = event.target;

		const { loginData } = this.state;

			this.setState({
				loginData : { ...loginData, [name]: value }
			});

	}

	handleSubmit(event) {
		event.preventDefault();

		const { loginData } = this.state;

		const errors = this.validate(loginData);

	

		if (errors) {
			this.setState({ errors });
			// this.props.history.push('/home');
			// axios
			// .post("/api/users/login",loginData)
			// .then(res=>{
			// 	console.log(res);
			// 	if(res.status === 200){
			// 		localStorage.setItem("token",res.headers["x-auth"]);
			// 		console.log('succes');
			// 		this.props.history.push('/home');
			// 	}
			// })
			// .catch(errors=>{
			// 	console.log(errors);
			// 	// this.setState({ errors });
			// })
			
			// this.props.submit(loginData);

			// this.setState(this.initialState);
		}
		
		

	}

	validate(data) {

		const errors = {};

		if (!data.email) {
			errors.email = 'this field cannot be empty'

		} else if (!data.password) {
			errors.password = 'this field cannot be empty'

		} else if (data.password.length <= 5) {
			errors.password = 'your password must be 6 chars length at least'

		} else if(!this.props.isUserAuthenticated(data)){
			errors.credentialsErrors = "these credentials doesn`t match our records";

		}

		return errors;
	}
  render() {
    const { loginData, errors } = this.state;
    return (
      <Form inline  className='float-lg-right' method="post" onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="email" hidden>Email</Label>
          <Input type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={loginData.email}
					onChange={this.handleChange}/>
          {errors.email && <span className="text-danger text-center">{errors.email}</span>}
        </FormGroup>
        {/* {' '} */}
        <FormGroup>
          <Label for="password" hidden>Password</Label>
          <Input type="password"
          name="password"
          id="pass"
          placeholder="Password"
          value={loginData.password}
					onChange={this.handleChange}/>
          {errors.password && <span className="text-danger text-center">{errors.password}</span>}
        </FormGroup>
        {/* {' '} */}
        <Button id='loginSubmit' type="submit">Login</Button>
        {errors.credentialsErrors && <span className="text-danger text-center">{errors.credentialsErrors}</span>}
      </Form>
    );
  }
}

Login.propTypes = {

	submit : propTypes.func.isRequired,
	isUserAuthenticated : propTypes.func.isRequired,

  users: propTypes.arrayOf(
		propTypes.shape({
			email: propTypes.string.isRequired,
		}).isRequired
	),

	history: propTypes.shape({
		push: propTypes.func.isRequired
	}).isRequired
}