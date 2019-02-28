import React, { Component } from "react";
import { Row, Col } from 'reactstrap';
import {Link} from "react-router-dom";
import '../css/SingleAuthorPage.css';
import CustomNavbar from './Navbar';
import DropDownShelves from './DropDownShelves'
import RatingStars from './RatingStars';


class SingleHomePage extends Component {

    constructor(props) {
    super(props);

    this.state={
        author:{name:"dssd",date:"dscsd",img:"/sadsad"},
        books:[{bookInfo:{img:"imageURL",bookName:"7amada",bookLink:"www.google.com",authorName:"ana",authorLink:"www.google.com"},shelf:"toRead",rate:4},
        {bookInfo:{img:"imageURL",bookName:"7amada",bookLink:"www.google.com",authorName:"ana",authorLink:"www.google.com"},shelf:"toRead",rate:4},
        {bookInfo:{img:"imageURL",bookName:"7amada",bookLink:"www.google.com",authorName:"ana",authorLink:"www.google.com"},shelf:"toRead",rate:4},
        {bookInfo:{img:"imageURL",bookName:"7amada",bookLink:"www.google.com",authorName:"ana",authorLink:"www.google.com"},shelf:"toRead",rate:4},
        {bookInfo:{img:"imageURL",bookName:"7amada",bookLink:"www.google.com",authorName:"ana",authorLink:"www.google.com"},shelf:"toRead",rate:4},
        {bookInfo:{img:"imageURL",bookName:"7amada",bookLink:"www.google.com",authorName:"ana",authorLink:"www.google.com"},shelf:"toRead",rate:4},
        {bookInfo:{img:"imageURL",bookName:"7amada",bookLink:"www.google.com",authorName:"ana",authorLink:"www.google.com"},shelf:"toRead",rate:4},
        {bookInfo:{img:"imageURL",bookName:"7amada",bookLink:"www.google.com",authorName:"ana",authorLink:"www.google.com"},shelf:"toRead",rate:4},
        {bookInfo:{img:"imageURL",bookName:"7amada",bookLink:"www.google.com",authorName:"ana",authorLink:"www.google.com"},shelf:"toRead",rate:4},
        ]
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
                            <img src={this.state.author.img} width="80"/>
                        </Col>
                    </Row>
               </Col>
               <Col xs="10" className="p-0">
                    <Row>
                        <Col className="p-0 authorInfo">
                            <h3>{this.state.author.date}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="p-0 authorInfo">
                            <p>Book Summary</p>
                        </Col>
                    </Row>
               </Col>
            </Row>
                
            <Row>
                <Col className="authorInfo mx-5 mt-5 authorBooks">
                    <h3>Author's Books</h3>
                    {(this.state.books.map(book=>(
                    <Row>
                        <Col xs="3">
                            <Col>
                                <img src={book.bookInfo.img} width="40"/>
                            </Col>
                            <Col>
                            <Link to="#" replace>{book.bookInfo.bookName}</Link>
                            <RatingStars rate={book.bookInfo.avgRate} clickable={false}/>
                            </Col>
                        </Col>
                        <Col xs="6">
                        </Col>
                        <Col xs="3" className="text-center">
                        <RatingStars rate={book.rate} clickable={true} name={book.bookInfo.bookName} books={this.state.books}/>
                        <DropDownShelves book={book} books={this.state.books} />
                        </Col>
                        <hr/>
                    </Row>
                    ))
                    )}
                </Col>
            </Row>
          </div>
        );
      }
}

export default SingleHomePage;