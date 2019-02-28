import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import propTypes from "prop-types";
import { sendSignUpRequest } from "../services/usersFetch";
import axios from "axios";
// import { url } from 'inspector';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      newAccountData: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        retypePassword: ""
      },
      selectedFile: null,
      loaded: 0,
      imageSrc: "",
      errors: {}
    };

    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
    this.dataValidation = this.dataValidation.bind(this);
  }

  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };
  // handleUpload = () => {
  //   const data = new FormData()
  //   data.append('file', this.state.selectedFile, this.state.selectedFile.name)
  //   const obj1 = {
  //     name: 'ghgh',
  //     place: 'kjkjkj',
  //     age: 766
  //   }
  //   data.append('body', JSON.stringify(obj1));
  //   // data.append('name',"ahmed");
  //   axios
  //     .post("/uploader", data, {
  //       onUploadProgress: ProgressEvent => {
  //         this.setState({
  //           loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
  //         })
  //       },
  //     })
  //     .then(res => {
  //       console.log(res.data['path']);
  //       this.setState({
  //         imageSrc: `${res.data['path']}`
  //       })
  //       // axios.get(`/image`,{
  //       //   params:{
  //       //     name:res.data['file']
  //       //   }
  //       // })
  //       // .then(res=> {console.log(res);
  //       //   this.setState({
  //       //     imageSrc : `${res.data}`
  //       //    })
  //       // } )
  //       // .catch(err => console.log(err))

  //       console.log(res.statusText);
  //       console.log(res);
  //     })
  //     .catch(err => console.log(err))

  // }

  handleChange(event) {
    const { name, value } = event.target;

    const { newAccountData } = this.state;

    this.setState({
      newAccountData: {
        ...newAccountData,
        [name]: value
      }
    });
  }

  handleSubmission(event) {
    event.preventDefault();
    const { newAccountData } = this.state;
    const errors = this.dataValidation(newAccountData);

    this.setState({
      errors
    });

    if (Object.keys(errors).length === 0) {
      const data = new FormData();
      if(this.state.selectedFile)
      {
        data.append(
          "file",
          this.state.selectedFile,
          this.state.selectedFile.name
        );
      }
      

      data.append("body", JSON.stringify(newAccountData));
      const conf = {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        },
        headers: {
          "Content-Type": "application/json",
          "x-auth": "token"
        }
      };

      //Send Request
      axios
        .post("/api/users/register", data, conf)
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem("token", res.headers["x-auth"]);

            this.props.history.push("/home");
          }
        })
        .catch(errors => {
          console.log("Error:", errors);
          this.setState({ errors });
        });

    }
  }

  dataValidation(data) {
    const errors = {};

    if (!data.firstName) {
      errors.firstName = "this field cannot be empty";
    } else if (!data.lastName) {
      errors.lastName = "this field cannot be empty";
    } else if (!data.email) {
      errors.email = "this field cannot be empty";
    } else if (this.props.isUserExists(data)) {
      errors.email = "this email is already used";
    } else if (!data.password) {
      errors.password = "this field cannot be empty";
    } else if (data.password.length <= 5) {
      errors.password = "your password must be 6 chars length at least";
    } else if (data.password !== data.retypePassword) {
      errors.retypePassword = "the password fields do not match, try again";
    }

    return errors;
  }

  render() {
    const { newAccountData, errors } = this.state;

    return (
      <>
        <Form method="post" onSubmit={this.handleSubmission}>
          <FormGroup className="signUpForm">
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Please enter your first name"
              onChange={this.handleChange}
              value={newAccountData.firstName}
            />{" "}
            {errors.firstName && (
              <span className="text-danger"> {errors.firstName} </span>
            )}{" "}
          </FormGroup>{" "}
          <FormGroup>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Please enter your last name"
              onChange={this.handleChange}
              value={newAccountData.lastName}
            />{" "}
            {errors.lastName && (
              <span className="text-danger"> {errors.lastName} </span>
            )}{" "}
          </FormGroup>{" "}
          <FormGroup>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Please enter your email"
              onChange={this.handleChange}
              value={newAccountData.email}
            />{" "}
            {errors.email && (
              <span className="text-danger"> {errors.email} </span>
            )}{" "}
          </FormGroup>{" "}
          <FormGroup>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={newAccountData.password}
            />{" "}
            {errors.password && (
              <span className="text-danger"> {errors.password} </span>
            )}{" "}
          </FormGroup>{" "}
          <FormGroup>
            <Input
              type="password"
              name="retypePassword"
              id="retypePassword"
              placeholder="Confirm password"
              value={newAccountData.retypePassword}
              onChange={this.handleChange}
            />{" "}
            {errors.retypePassword && (
              <span className="text-danger"> {errors.retypePassword} </span>
            )}{" "}
          </FormGroup>{" "}
          <FormGroup>
            <Label for="exampleFile" className="picLabel">
              {" "}
              Personal picture{" "}
            </Label>{" "}
            <Input
              type="file"
              name=""
              id="exampleFile"
              onChange={this.handleselectedFile}
            />{" "}
            <div> {Math.round(this.state.loaded, 2)} % </div>{" "}
          </FormGroup>
          <Button> Sign up </Button>{" "}
        </Form>{" "}
        <img src={`${this.state.imageSrc}`} width="100" height="100" alt="" />
      </>
    );
  }
}

SignUp.propTypes = {
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
