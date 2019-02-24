import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import propTypes from 'prop-types';
import {sendSignUpRequest} from '../services/usersFetch';
export default class SignUp extends React.Component {

  constructor(props) {
    super(props);

    this.initialState = {

        newAccountData: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            retypePassword: "", 
            image:''
        },

        errors: {}

    };

    this.state = this.initialState

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
    this.dataValidation = this.dataValidation.bind(this);

}

handleChange(event) {

    const { name, value } = event.target;

    const { newAccountData } = this.state;

    this.setState({

        newAccountData: { ...newAccountData, [name]: value }

    });

}

handleSubmission = (event)=> {
  event.preventDefault();
    const { newAccountData } = this.state;
    const errors = this.dataValidation(newAccountData);

    this.setState({ errors })

    if (Object.keys(errors).length === 0) {
      
      console.log(newAccountData);
      sendSignUpRequest(newAccountData)
      .then(data => console.log(JSON.stringify( data)))
      .catch(e => console.log(e));

      this.props.submit(newAccountData)

      this.setState(this.initialState)
        
    }
    
}

dataValidation(data) {
    const errors = {}

    if (!data.firstName) {
        errors.firstName = "this field cannot be empty"

    } else if (!data.lastName) {
        errors.lastName = "this field cannot be empty"

    } else if (!data.email) {
        errors.email = "this field cannot be empty"

    }else if(this.props.isUserExists(data)){
        errors.email = "this email is already used"
     }
    
    else if (!data.password) {
        errors.password = "this field cannot be empty"

    } else if (data.password.length <= 5) {
        errors.password = 'your password must be 6 chars length at least'

    } else if (data.password !== data.retypePassword) {
        errors.retypePassword = "the password fields do not match, try again"
    }

    return errors;

}

  render() {
    const { newAccountData, errors } = this.state

    return (
      <Form method="post" onSubmit={this.handleSubmission}>
        <FormGroup className="signUpForm" > 
          <Input type="text"
          name="firstName"
          id="firstName"
          placeholder="Please enter your first name"
          onChange={this.handleChange}
          value={newAccountData.firstName}/>
          {errors.firstName && <span className="text-danger">{errors.firstName}</span>}
        </FormGroup>
        <FormGroup>
          <Input type="text"
          name="lastName"
          id="lastName"
          placeholder="Please enter your last name"
          onChange={this.handleChange}
          value={newAccountData.lastName}/>
          {errors.lastName && <span className="text-danger">{errors.lastName}</span>}
        </FormGroup>
        <FormGroup>
          <Input type="email"
          name="email" id="email"
          placeholder="Please enter your email"
          onChange={this.handleChange}
          value={newAccountData.email} />
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </FormGroup>
        <FormGroup>
          <Input type="password" name="password" id="password"
          onChange={this.handleChange}
          value={newAccountData.password}/>
          {errors.password && <span className="text-danger">{errors.password}</span>}
        </FormGroup>
        <FormGroup>
          <Input type="password" name="retypePassword" id="retypePassword"
          value={newAccountData.retypePassword}
          onChange={this.handleChange}/>
          {errors.retypePassword && <span className="text-danger">{errors.retypePassword}</span>}
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile" className="picLabel">Personal picture</Label>
          <Input type="file" name="file" id="exampleFile" />
          <Label for="exampleFile">Personal picture</Label>
          <Input type="file" name="image" id="exampleFile" />
        </FormGroup>
        <Button > Sign up</Button>
      </Form>
    );
  }
}

SignUp.propTypes = {

  submit: propTypes.func.isRequired,
  isUserExists : propTypes.func.isRequired
}
