import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/UserCategoriesPage.css";
import CustomNavbar from "./Navbar";

class UserHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      categoryUnit: []
    };
  }

  componentDidMount(){
    const token = localStorage.token;
  if(token) {
    const conf ={
      headers:{
      "x-auth":token,
      }
    }
    axios.get(`/api/users/current/categories`,conf
    )
    .then(res =>{
      console.log(res.data)
      let chunk_size = 5;
      this.state.categoryUnit = res.data
      .map(function(e, i) {
        return i % chunk_size === 0 ? res.data.slice(i, i + chunk_size) : null;
      })
      .filter(function(e) {
        return e;
      });
      this.setState({
        categories:res.data,
      })
    })
    .catch(err => console.log(err))
  }
  }
  render() {
    return (
      <div>
        <CustomNavbar />
        <Row className="bookShelves">
        {(
           this.state.categoryUnit.map(cats =>(
               <Col className="mt-5">
                    <div>
                        <ul className="bookCatShelves">
                            <li>
                            <Link replace to={`/category?${cats[0].catName}`}>{cats[0].catName}</Link>
                            </li>
                            <li className="catShelf"/>
                        </ul>
                  {cats[1] ? (
                  <ul className="bookCatShelves">
                    <li>
                    <Link replace to={`/category?${cats[1].catName}`}>{cats[1].catName}</Link>
                    </li>
                    <li className="catShelf" />
                  </ul>
                ) : (
                  ""
                )}
                {cats[2] ? (
                  <ul className="bookCatShelves">
                    <li>
                    <Link replace to={`/category?${cats[2].catName}`}>{cats[2].catName}</Link>
                    </li>
                    <li className="catShelf" />
                  </ul>
                ) : (
                  ""
                )}

                {cats[3] ? (
                  <ul className="bookCatShelves">
                    <li>
                    <Link replace to={`/category?${cats[3].catName}`}>{cats[3].catName}</Link>
                    </li>
                    <li className="catShelf" />
                  </ul>
                ) : (
                  ""
                )}

                {cats[4] ? (
                  <ul className="bookCatShelves">
                    <li>
                    <Link replace to={`/category?${cats[4].catName}`}>{cats[4].catName}</Link>
                    </li>
                    <li className="catShelf" />
                  </ul>
                ) : (
                  ""
                )}
              </div>
            </Col>
          ))
        )}
        </Row>
      </div>
    )
  }
}

export default UserHomePage;
