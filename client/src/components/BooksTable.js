import React, { Component } from "react";
import { Row } from 'reactstrap';
import {Table} from 'reactstrap';
import {Link} from "react-router-dom";
import '../css/UserHomePage.css'
import DropDownShelves from './DropDownShelves'
import RatingStars from './RatingStars';

class BooksTable extends Component {

constructor(props) {
    super(props);
    this.state = {
      books:props.books,
    };
  }





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
                <th>Category</th>
                <th>Avg rate</th>
                <th>Rating</th>
                <th>Shelve</th>
              </tr>
              </thead>
              <tbody>
              {(
                this.state.books.map(book=>(
                  <tr>
                      <td><img src={book.bookInfo.img} width="40"/></td>
                      <td><Link to="/" replace>{book.bookInfo.bookName}</Link></td>
                      <td><Link to="/" replace>{book.bookInfo.author}</Link></td>
                      <td>{book.bookInfo.category}</td>
                      <td><RatingStars rate={book.bookInfo.avgRate} clickable={false}/></td>
                      <td><RatingStars rate={book.rate} clickable={true} name={book.bookInfo.bookName} books={this.state.books}/></td>
                      <td>
                        <DropDownShelves book={book} books={this.state.books}/>
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
