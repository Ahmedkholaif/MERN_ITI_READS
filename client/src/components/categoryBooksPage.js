import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import "../css/CategoryBooksName.css";
import CustomPagination from "./pagination";
import CustomNavbar from "./Navbar";
import ItemsDisplay from "./ItemsDisplay";

class categoryBooksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: 1,
      categoryName: "",
      books: [
        {
          img: "imageURL",
          bookName: "7amada",
          bookLink: "www.google.com",
          authorName: "ana",
          authorLink: "www.google.com"
        },
        {
          img: "imageURL",
          bookName: "7amada",
          bookLink: "www.google.com",
          authorName: "ana",
          authorLink: "www.google.com"
        },
        {
          img: "imageURL",
          bookName: "7amada",
          bookLink: "www.google.com",
          authorName: "ana",
          authorLink: "www.google.com"
        },
        {
          img: "imageURL",
          bookName: "7amada",
          bookLink: "www.google.com",
          authorName: "ana",
          authorLink: "www.google.com"
        },
        {
          img: "imageURL",
          bookName: "7amada",
          bookLink: "www.google.com",
          authorName: "ana",
          authorLink: "www.google.com"
        },
        {
          img: "imageURL",
          bookName: "7amada",
          bookLink: "www.google.com",
          authorName: "ana",
          authorLink: "www.google.com"
        },
        {
          img: "imageURL",
          bookName: "7amada",
          bookLink: "www.google.com",
          authorName: "ana",
          authorLink: "www.google.com"
        },
        {
          img: "imageURL",
          bookName: "7amada",
          bookLink: "www.google.com",
          authorName: "ana",
          authorLink: "www.google.com"
        },
        {
          img: "imageURL",
          bookName: "7amada",
          bookLink: "www.google.com",
          authorName: "ana",
          authorLink: "www.google.com"
        },
        {
          img: "imageURL",
          bookName: "7amada",
          bookLink: "www.google.com",
          authorName: "ana",
          authorLink: "www.google.com"
        },
        {
          img: "imageURL",
          bookName: "7amada",
          bookLink: "www.google.com",
          authorName: "ana",
          authorLink: "www.google.com"
        },
        {
          img: "imageURL",
          bookName: "7amada",
          bookLink: "www.google.com",
          authorName: "ana",
          authorLink: "www.google.com"
        }
      ],
      activePage: 1
    };

    const chunk_size = 10;
    const arr = this.state.books;
    this.state.booksUnit = arr
      .map(function(e, i) {
        return i % chunk_size === 0 ? arr.slice(i, i + chunk_size) : null;
      })
      .filter(function(e) {
        return e;
      });
  }

<<<<<<< HEAD
  handelPagination = pageNum => {
    this.setState({ activePage: pageNum });
    // window.fetch(`/userBooks?${pageNum}?${this.state.shelf}`)
    // .then(response => response.json()).then(data=> this.setState({activePage: pageNum,books:data});) ;
  };
=======
componentDidMount(){
    // const {name} = this.props.location.state;
    console.log(this.props.location);
}
>>>>>>> 76f0d64e0e6ee1f7083e441ec9e7662fe6cccf6e

  render() {
    return (
      <div>
        <CustomNavbar />
        <h2>{this.state.categoryId}</h2>
        <Row id="displayedItems">
          <ItemsDisplay items={this.state.books} />
        </Row>
        <Row className="justify-content-md-center">
<<<<<<< HEAD
          <Col>
            <h2 />
            <CustomPagination
              activePage={this.state.activePage}
              change={this.handelPagination}
            />
          </Col>
=======
            <Col>
                <CustomPagination activePage={this.state.activePage} change={this.handelPagination}/>
            </Col>
>>>>>>> 76f0d64e0e6ee1f7083e441ec9e7662fe6cccf6e
        </Row>
      </div>
    );
  }
}

export default categoryBooksPage;
