import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../css/SingleBookPage.css";
import CustomNavbar from "./Navbar";
import DropDownShelves from "./DropDownShelves";
import RatingStars from "./RatingStars";
import axios from "axios";
let avgRate;

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
          avgRate = res.data.rate.rating / res.data.rate.number;

          if (res.status === 200) {
            let currentBook = {
              bookInfo: res.data
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
                  rate={this.state.book.bookInfo.avgRate}
                  clickable={true}
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
