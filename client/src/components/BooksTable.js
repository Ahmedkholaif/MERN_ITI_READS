import React, { Component } from "react";
import { Row, Col } from 'reactstrap';
import {Table} from 'reactstrap';
import '../css/UserHomePage.css'
var _ = require('lodash');

class BooksTable extends Component {

    constructor(props) {
        super(props);
        this.state = {

          selected: '',
      
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
      componentDidMount(){
       
    }
    handleChange = (selected) => {

      this.setState({ selected: selected.target.value });
    };
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
                                                    <td>
                                                    <select
                                                      onChange={this.handleChange}
                                                      value={book.shelf}>
                                                      <option value="read">Read</option>
                                                    <option value="current">Currently Reading</option>
                                                    <option value="toRead">To Read</option>
                                                    </select>
                                                    </td>
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
