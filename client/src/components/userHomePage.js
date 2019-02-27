import React, { Component } from "react";
import { Row, Col } from 'reactstrap';
import '../css/UserHomePage.css'
import CustomNavbar from './Navbar';
import BooksTable from './BooksTable';
import CustomPagination from './pagination';
import axios from "axios";


class UserHomePage extends Component {

constructor(props) {
    super(props);

    
    this.state = {
      isOpen: false,
      activePage:1,
      shelf : "all",
      books:[],
    }

  }
  

componentDidMount(){
  const token = localStorage.token;
  if(token) {
    const conf ={
      params:{
        page:`${this.state.activePage}`,
        mode:`${this.state.shelf}`
      },
      headers:{
      "x-auth":token,
      }
    }
    axios.get(`/api/users/current`,conf
    )
    .then(res =>{
      console.log(res);
      console.log(res.data.books)
      this.setState({
        books:res.data.books,

      })
    })
    .catch(err => console.log(err))
  }

}
// test = setInterval(() => {
//   alert(this.state.books[0].rate)
// }, 5000);


displayAllBooks =()=>{
  if(this.state.shelf!=="all")
  {
    this.setState({
      shelf:"all",
      activePage:1,
    })
  }
}
displayReadBooks =()=>{
  if(this.state.shelf!=="read")
  {
    this.setState({
      shelf:"read",
      activePage:1,
    })
  }
}
displayCurrentlyReadingBooks =()=>{
  if(this.state.shelf!=="current")
  {
    this.setState({
      shelf:"current",
      activePage:1,
    })
  }
}
displayToReadBooks =()=>{
  if(this.state.shelf!=="toRead")
  {
    this.setState({
      shelf:"toRead",
      activePage:1,
    })
  }
}


handelPagination = (pageNum)=>
{
  this.setState({activePage: pageNum});
  // window.fetch(`/userBooks?${pageNum}?${this.state.shelf}`)
  // .then(response => response.json()).then(data=> this.setState({activePage: pageNum,books:data});) ;
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
                        <BooksTable books={this.state.books} shelf={this.state.shelf}/>
                        <CustomPagination activePage={this.state.activePage} change={this.handelPagination}/>
                    </Col>
                </Row>
            </Col>
        </Row>
      </div>
    );
  }
}




export default UserHomePage;
