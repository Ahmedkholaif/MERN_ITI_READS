import React, { Component } from "react";
import { Row, Col } from 'reactstrap';
import '../css/UserHomePage.css'
import CustomNavbar from './Navbar';
import BooksTable from './BooksTable';
import CustomPagination from './pagination';

var _ = require('lodash');

class UserHomePage extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };

        this.state={
          shelf : "all",
          books:[
            {bookInfo:{img:"img1",bookName:"book1",author:"auth1",category:"mm"}
          ,rate:"1",shelf:"read"},
          {bookInfo:{img:"img2",bookName:"book2",author:"auth1",category:"mm"}
          ,rate:"5",shelf:"toRead"},
          {bookInfo:{img:"img3",bookName:"book3",author:"auth1",category:"mm"}
          ,rate:"4",shelf:"current"},
          {bookInfo:{img:"img4",bookName:"book4",author:"auth1",category:"mm"}
          ,rate:"0",shelf:"read"},
          {bookInfo:{img:"img1",bookName:"book5",author:"auth1",category:"mm"}
          ,rate:"4.5",shelf:"toRead"}
        ]
        }

      }

      
      
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      componentDidMount() {
    }

    displayAllBooks =()=>{
      this.setState({
        displayedBooks:"all",
      })
      alert("all");
    }
    displayReadBooks =()=>{
      this.setState({
        displayedBooks:"read",
      })
      alert("read");
    }
    displayCurrentlyReadingBooks =()=>{
      this.setState({
        displayedBooks:"current",
      })
      alert("current");
    }
    displayToReadBooks =()=>{
      this.setState({
        displayedBooks:"toRead",
      })
      alert("toRead");
    }
      render() {
        return (
          <div>
                <CustomNavbar/>
                <Row className="homeBody">
                <Col xs="3">
                    <div className="sideMenu">
                      <ul>
                        <li>
                          <h6 link="#" onClick={this.displayAllBooks}>All books</h6>
                          <hr/>
                        </li>
                        <li>
                          <h6 onClick={this.displayReadBooks}>Read</h6>
                          <hr/>
                        </li>
                        <li>
                          <h6 onClick={this.displayCurrentlyReadingBooks}>Currently reading</h6>
                          <hr/>
                        </li>
                        <li>
                          <h6 onClick={this.displayToReadBooks}>Want to read</h6>
                          <hr/>
                        </li>
                      </ul>
                    </div>
                </Col>
                <Col xs="9">
                    <Row className="rightMenu">
                        <Col>
                            <BooksTable books={this.state.books}/>
                            <CustomPagination/>
                        </Col>
                    </Row>
                </Col>
            </Row>
          </div>
        );
      }
    }




export default UserHomePage;
