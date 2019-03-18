import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../css/SingleAuthorPage.css";
import CustomNavbar from "./Navbar";
import DropDownShelves from "./DropDownShelves";
import RatingStars from "./RatingStars";
import axios from "axios";

class SingleHomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: { name: null, date: null, img: null },
      books: []
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
          `/api/users/current/authors/${this.props.location.search.substr(1)}`,
          conf
        )
        .then(res => {
          if (res.status === 200) {
            console.log(res.data);
            let author = {
              name: res.data.name,
              img: res.data.img
            };
            let books = res.data.books;

            this.setState({
              author,
              books
            });
          }
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    let ratedBooks = [];
    this.state.books.forEach(book => {
      ratedBooks.push({ bookInfo: book });
    });
    return (
      <div>
        <CustomNavbar />
        <Row className="bookBody">
          <Col xs="2">
            <Row>
              <Col>
                <img src={this.state.author.img} width="80" />
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
                <h3>{this.state.author.name}</h3>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col className="authorInfo mx-5 mt-5 authorBooks">
            <h3>Author's Books</h3>
            {this.state.books.map(book => (
              <Row>
                <Col xs="3">
                  <Col>
                    <img src={book.img} width="40" />
                  </Col>
                  <Col>
                    <Link to={`/book?${book.bookName}`} replace>
                      {book.bookName}
                    </Link>
                  </Col>
                </Col>
                <Col xs="6" />
                <Col xs="3" className="text-center">
                  <RatingStars
                    rate={book.avgRate.total / book.avgRate.users}
                    clickable={true}
                    name={book.bookName}
                    books={ratedBooks}
                  />
                  {/* <DropDownShelves book={book} books={ratedBooks} /> */}
                </Col>
                <hr />
              </Row>
            ))}
          </Col>
        </Row>
      </div>
    );
  }
}

export default SingleHomePage;
