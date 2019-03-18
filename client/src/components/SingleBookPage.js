import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../css/SingleBookPage.css";
import CustomNavbar from "./Navbar";
import DropDownShelves from "./DropDownShelves";
import RatingStars from "./RatingStars";
import axios from "axios";
let avgRate;
let clickable = true;

class SingleHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {
        bookInfo: {}
      },
      books: [
        {
          bookInfo: {}
        }
      ]
    };
  }
  componentDidMount() {
    const token = localStorage.token;
    if (token) {
      const conf = {
        headers: {
          "x-auth": token
        }
      };
      axios
        .get(
          `/api/users/current/books/${this.props.location.search.substr(1)}`,
          conf
        )
        .then(res => {
          avgRate = res.data.rating.rating / res.data.rating.number;
          if (res.status === 200) {
            console.log(res.data);
            let currentBook = {
              bookInfo: res.data.bookInfo,
              rate : res.data.rate,
              shelf : res.data.shelf
            };
            this.setState({
              book: currentBook,
              books: [currentBook]
            });
          }
        })
        .catch(err => console.log(err));
    }
  }

  render() {
      if (this.state.book.rate>0){
        clickable = false;
      }
    return (
      <div>
        <CustomNavbar />
        <Row className="bookBody">
          <Col xs="2">
            <Row>
              <Col>
                <img src={this.state.book.bookInfo.img} width="80" />
              </Col>
            </Row>
            <Row>
              <Col>
                <DropDownShelves
                  book={this.state.book}
                  books={this.state.books}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <RatingStars
                  rate={this.state.book.rate}
                  clickable={clickable}
                  name={this.state.book.bookInfo.bookName}
                  books={this.state.books}
                />
              </Col>
            </Row>
          </Col>
          <Col xs="10" className="p-0">
            <Row>
              <Col className="p-0 bookInfo">
                <h3>{this.state.book.bookInfo.bookName}</h3>
                <Link to="#">{this.state.book.bookInfo.author}</Link>
                <Link to="#">{this.state.book.bookInfo.category}</Link>
                <RatingStars rate={avgRate} clickable={false} />
              </Col>
            </Row>
            <Row>
              <Col className="p-0 bookInfo">
                <p>{`${this.state.book.bookInfo.description}`}</p>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col className="bookInfo mx-5">
            <h3>Reviews</h3>
            <p>{`${this.state.book.bookInfo.reviews}`}</p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SingleHomePage;
