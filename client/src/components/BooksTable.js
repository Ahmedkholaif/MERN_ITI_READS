import React, { Component } from "react";
import { Row, Col } from 'reactstrap';
import {Table} from 'reactstrap';
import '../css/UserHomePage.css'
import DropDownList from './DropDownList';
var _ = require('lodash');

class BooksTable extends Component {

    constructor(props) {
        super(props);
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
      componentDidMount(){
       
    }
      render() {
        return (
          <div>
               <Row>
                                <h3 className="tableTitle">All Books</h3>
                            </Row>
                            <Row>
                                    <Table>
                                        <thead>
                                        <tr>
                                            <th>Cover</th>
                                            <th>Name</th>
                                            <th>Author</th>
                                            <th>Avg rate</th>
                                            <th>Rating</th>
                                            <th>Shelve</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {(
                                            this.props.books.map(book=>(
                                                <tr>
                                                    <td>{book.bookInfo.img}</td>
                                                    <td>{book.bookInfo.bookName}</td>
                                                    <td>{book.bookInfo.author}</td>
                                                    <td>{book.bookInfo.category}</td>
                                                    <td>{book.rate}</td>
                                                    <td><DropDownList shelf={book.shelf}/></td>
                                                </tr>
                                            ))
                                        )}
                                        </tbody>
                                    </Table>
                            </Row>
                            
          </div>
        );
      }
    }




export default BooksTable;
