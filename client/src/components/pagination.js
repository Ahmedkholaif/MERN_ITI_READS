import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import {
    Table,
    Pagination,
    PaginationItem, 
    PaginationLink } from 'reactstrap';
import '../css/UserHomePage.css'

var _ = require('lodash');

class CustomPagination extends Component {

    constructor(props) {
        super(props);
      }
      render() {
        return (
          <div>
                <Row className="pagginationContainer">
                            <Pagination aria-label="Page navigation example" className="pagginationItem">
                                    <PaginationItem disabled>
                                    <PaginationLink previous href="#" />
                                    </PaginationItem>
                                    <PaginationItem active>
                                    <PaginationLink href="#">
                                        1
                                    </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                    <PaginationLink href="#">
                                        2
                                    </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                    <PaginationLink href="#">
                                        3
                                    </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                    <PaginationLink href="#">
                                        4
                                    </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                    <PaginationLink href="#">
                                        5
                                    </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                    <PaginationLink next href="#" />
                                    </PaginationItem>
                            </Pagination>                                
                            </Row>
          </div>
        );
      }
    }




export default CustomPagination;

// Pagination.propTypes = {
//     children: PropTypes.node,
//     className: PropTypes.string,
//     listClassName: PropTypes.string,
//     cssModule: PropTypes.object,
//     size: PropTypes.string,
//     tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//     listTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//     'aria-label': PropTypes.string
//   };
  
//   PaginationItem.propTypes = {
//     active: PropTypes.bool,
//     children: PropTypes.node,
//     className: PropTypes.string,
//     cssModule: PropTypes.object,
//     disabled: PropTypes.bool,
//     tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//   };
  
//   PaginationLink.propTypes = {
//     children: PropTypes.node,
//     className: PropTypes.string,
//     cssModule: PropTypes.object,
//     next: PropTypes.bool,
//     previous: PropTypes.bool,
//     first: PropTypes.bool,
//     last: PropTypes.bool,
//     tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//     'aria-label': PropTypes.string
//   };