import React, { Component } from "react";
import { Row, Col } from 'reactstrap';
import propTypes from 'prop-types';
import Login from './loginForm';
import SignUp from './signUpForm'
import '../css/GuestHomePage.css'

var _ = require('lodash');

class GuestHomePage extends Component {


	isUserAuthenticated = (data) => {

    //check in the data got from server
		const { users } = this.props;

		let userData = _.find(users, user => {

			return user.email === data.email && user.password === data.password;

		});

		return userData;
	}



	submitLogin = (data) => {

		let user = this.isUserAuthenticated(data);

		if (user) {

    // mark the user as authenticated
			this.props.history.push("/home")

		}
  }
  
  isUserExists = data => {

		const { users } = this.props;

		let emailUsed = _.find(users, user => {

			return user.email === data.email

		})

		return emailUsed;

	}


	submitRegister = (data) => {

  
    //send data to server

		this.props.history.push("/HomePage");
  }
  

  render() {
    return (
      <div id='HomeContent'>
        <Row>
          <Col>
            <Login submit={this.submitLogin} isUserAuthenticated={this.isUserAuthenticated}/>
          </Col>
        </Row>
        <Row className="seperator10"></Row>
        <Row>
					<Col xs="4"><SignUp isUserExists={this.isUserExists}
					history={this.props.history}
          submit={this.submitRegister}
          /></Col>
          <Col xs="4"></Col>
          <Col xs="4"></Col>
        </Row>
      </div>
    );
  }
}


GuestHomePage.propTypes = {

	users: propTypes.arrayOf(
		propTypes.shape({
			email: propTypes.string.isRequired,
		}).isRequired
	),

	history: propTypes.shape({
		push: propTypes.func.isRequired
	}).isRequired
}


export default GuestHomePage;