import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../css/UserCategoriesPage.css";
import CustomNavbar from "./Navbar";

class UserHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        { catId: 44, catName: "cat 1" },
        { catId: 2, catName: "cat 1" },
        { catId: 2, catName: "cat 1" },
        { catId: 7, catName: "cat 1" },
        { catId: 1, catName: "cat 1" },
        { catId: 8, catName: "cat 1" },
        { catId: 1, catName: "cat 1" }
      ],
      categoryUnit: []
    };
    const chunk_size = 5;
    const arr = this.state.categories;
    this.state.categoryUnit = arr
      .map(function(e, i) {
        return i % chunk_size === 0 ? arr.slice(i, i + chunk_size) : null;
      })
      .filter(function(e) {
        return e;
      });
  }

  render() {
    return (
      <div>
        <CustomNavbar />
        <Row className="bookShelves">
        {(
           this.state.categoryUnit.map(cats =>(
               <Col>
                    <div>
                        <ul className="bookCatShelves"/>>
                            <li>
                            {/* <Link to={`/category?${cats[0].catId}`} replace>{cats[0].catName}</Link> */}
                            <Link replace to={
                                { pathname:`/category?${cats[0].catId}`, state: { name: `${cats[0].catName}`  } }
                                }>{cats[0].catName}</Link>

                            </li>
                            <li className="catShelf"/>

                {cats[2] ? (
                  <ul className="bookCatShelves">
                    <li>
                      <Link to={`/category?${cats[2].catId}`} replace>
                        {cats[2].catName}
                      </Link>
                    </li>
                    <li className="catShelf" />
                  </ul>
                ) : (
                  ""
                )}

                {cats[3] ? (
                  <ul className="bookCatShelves">
                    <li>
                      <Link to={`/category?${cats[3].catId}`} replace>
                        {cats[3].catName}
                      </Link>
                    </li>
                    <li className="catShelf" />
                  </ul>
                ) : (
                  ""
                )}

                {cats[4] ? (
                  <ul className="bookCatShelves">
                    <li>
                      <Link to={`/category?${cats[3].catId}`} replace>
                        {cats[3].catName}
                      </Link>
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
