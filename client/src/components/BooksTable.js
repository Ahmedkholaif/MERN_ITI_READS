import React, { Component } from "react";
import { Row, Col } from 'reactstrap';
import {Table} from 'reactstrap';
import '../css/UserHomePage.css'
var _ = require('lodash');

class BooksTable extends Component {

constructor(props) {
    super(props);
    this.state = {
      books:props.books,
    };
    this.handelBookShelf = this.handelBookShelf.bind(this);
  }




handelBookShelf = event  => {
  const newBooks = this.state.books.map(book=>{
    if(book.bookInfo.bookName == event.target.name)
    {
      book.shelf = event.target.value;
    }
    return book;
  })
  this.setState({books:newBooks});
};
  render() {
    return (
      <div>
        <Row>
        {(() =>{
        switch(this.props.shelf) {
          case 'all':
            return <h3 className="tableTitle">All Books</h3>;
          case 'read':
            return <h3 className="tableTitle">Read Books</h3>;
          case 'current':
            return <h3 className="tableTitle">Currently Reading Books</h3>;
          case 'toRead':
            return <h3 className="tableTitle">To Read Books</h3>;
          default:
            return null;
        }
      })()}
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
                this.state.books.map(book=>(
                  <tr>
                      <td><img src={book.bookInfo.img} width={"40px"}/></td>
                      <td><a href="/">{book.bookInfo.bookName}</a></td>
                      <td><a href="/">{book.bookInfo.author}</a></td>
                      <td>{book.bookInfo.category}</td>
                      <td>{book.rate}</td>
                      <td>
                      <select
                        value={book.shelf}
                        onChange={this.handelBookShelf}
                        name={book.bookInfo.bookName}
                        id="userShelf"
                        className="form-control form-control-sm">
                        <option value="Read" >Read</option>
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
