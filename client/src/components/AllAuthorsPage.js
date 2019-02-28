import React, { Component } from "react";
import { Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";
import '../css/AllAuthorsPage.css';
import CustomPagination from './pagination';
import CustomNavbar from './Navbar';
import ItemsDisplay from './ItemsDisplay'
import axios from "axios";


class categoryBooksPage extends Component {

constructor(props) {
super(props);
this.state={
    authors:[],
    activePage:1,
    itemsCount:1,
}

// const chunk_size = 10;
// const arr = this.state.books;
// this.state.booksUnit = arr.map( function(e,i){ 
//         return i%chunk_size===0 ? arr.slice(i,i+chunk_size) : null; 
// }).filter(function(e){ return e; });

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
      axios.get(`/api/users/current/authors`,conf
      )
      .then(res =>{
          console.log(res.data)
        this.setState({
            authors:res.data.authors,
            itemsCount:res.data.count
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
    axios.get(`/api/users/current/authors`,conf
    )
    .then(res =>{
      console.log(res.data);
      this.setState({
        authors:res.authors,
        activePage: pageNum,
        itemsCount:res.data.count
      })
    })
    .catch(err => console.log(err))
  }   
}
  
render() {
return (
    
    <div>
        <CustomNavbar/>
        <Row id="displayedItems">
        <Col>
        <Row className="justify-content-md-center">
          <Col>
            <Row>
              {this.state.authors.map(item => (
                <Col xs="3">
                  <Row className={"item"}>
                    <Col>
                      <img src={item.img} height="50px" />
                    </Col>
                  </Row>
                  <Row className={"item"}>
                    <Col>
                      <Link to={`/author?${item.fullName}`} replace>
                        {item.fullName}
                      </Link>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Col>
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
