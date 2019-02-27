import React, { Component } from "react";
import { Row, Col } from 'reactstrap';
import '../css/UserHomePage.css'
import CustomNavbar from './Navbar';
import BooksTable from './BooksTable';
import CustomPagination from './pagination';


class UserHomePage extends Component {

constructor(props) {
    super(props);

    
    this.state = {
      isOpen: false,
      activePage:1,
    };

    this.state={
      shelf : "all",
      books:[
        {bookInfo:{img:"img1",bookName:"book1",author:"auth1",category:"mm",avgRate:2}
      ,rate:1,shelf:"read"},
      {bookInfo:{img:"img2",bookName:"book2",author:"auth1",category:"mm",avgRate:1}
      ,rate:5,shelf:"toRead"},
      {bookInfo:{img:"img3",bookName:"book3",author:"auth1",category:"mm",avgRate:2}
      ,rate:4,shelf:"current"},
      {bookInfo:{img:"img4",bookName:"book4",author:"auth1",category:"mm",avgRate:5}
      ,rate:0,shelf:"read"},
      {bookInfo:{img:"img1",bookName:"book5",author:"auth1",category:"mm",avgRate:2}
      ,rate:3,shelf:"toRead"}
    ]
    }

  }
  
// componentDidMount()

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
