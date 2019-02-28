import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import "../css/CategoryBooksName.css";
import CustomPagination from "./pagination";
import CustomNavbar from "./Navbar";
import ItemsDisplay from "./ItemsDisplay";
import axios from "axios";

class categoryBooksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: 1,
      categoryName: this.props.location.search.substring(1),
      books: [],
      activePage: 1,
      itemsCount:1,
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

componentDidMount(){
  const token = localStorage.token;
  if(token) {
    const conf ={
      params:{
        page:`${this.state.activePage}`
      },
      headers:{
      "x-auth":token,
      }
    }
    axios.get(`/api/users/current/categories/${this.state.categoryName}`,conf
    )
    .then(res =>{
      console.log(res.data)
      this.setState({
        books:res.data.books,
        items:res.data.count
      })
    })
    .catch(err => console.log(err))
  }

}
handelPagination = (pageNum)=>
{
  const token = localStorage.token;
  if(token) {
    const conf ={
      params:{
        page:`${pageNum}`,
      },
      headers:{
      "x-auth":token,
      }
    }
    axios.get(`/api/users/current/categories/${this.state.categoryName}`,conf
    )
    .then(res =>{
      console.log(res.data);
      this.setState({
        books:res.data.books,
        activePage: pageNum
      })
    })
    .catch(err => console.log(err))
  }
}
  render() {
    return (
      <div>
        <CustomNavbar />
        <h2>{this.props.location.search.substring(1)}</h2>
        <Row id="displayedItems">
          <ItemsDisplay items={this.state.books} />
        </Row>
        <Row className="justify-content-md-center">
            <Col>
                <CustomPagination chunk={10} max={this.state.itemsCount} activePage={this.state.activePage} change={this.handelPagination}/>
            </Col>
        </Row>
      </div>
    );
  }
}

export default categoryBooksPage;
