import React, { Component } from "react";
import { Row, Col } from 'reactstrap';
import {Link} from "react-router-dom";
import '../css/SingleBookPage.css';
import CustomNavbar from './Navbar';
import DropDownShelves from './DropDownShelves'
import RatingStars from './RatingStars';


class SingleHomePage extends Component {

    constructor(props) {
    super(props);

    this.state={
        book:{bookInfo:{img:"/sdcsd",bookName:"dscds",author:"dscds",category:"dscdsc",avgRate:4,shelf:"toRead"}},
        books:[{bookInfo:{img:"/sdcsd",bookName:"dscds",author:"dscds",category:"dscdsc",avgRate:4,shelf:"toRead"}}]    
    }
    }



render() {
    return (
        
        <div>
            <CustomNavbar/>
            <Row className="bookBody">
               <Col xs="2">
                    <Row>
                        <Col>
                            <img src={this.state.book.bookInfo.img} width="80"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DropDownShelves book={this.state.book} books={this.state.books}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <RatingStars rate={this.state.book.bookInfo.avgRate} clickable={true}
                             name={this.state.book.bookInfo.bookName} books={this.state.books}/>
                        </Col>
                    </Row>
               </Col>
               <Col xs="10" className="p-0">
                    <Row>
                        <Col className="p-0 bookInfo">
                            <h3>{this.state.book.bookInfo.bookName}</h3>
                            <Link to="#">{this.state.book.bookInfo.author}</Link>
                            <Link to="#">{this.state.book.bookInfo.category}</Link>
                            <RatingStars rate={this.state.book.bookInfo.avgRate} clickable={false}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="p-0 bookInfo">
                            <p>Book Summary</p>
                        </Col>
                    </Row>
               </Col>
            </Row>
                
            <Row>
                <Col className="bookInfo mx-5">
                    <h3>Reviews</h3>
                    <p>ssssssssssssssssssssssssssssssssssssss</p>
                </Col>
            </Row>
          </div>
        );
      }
}

export default SingleHomePage;