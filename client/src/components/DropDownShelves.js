import React, { Component } from "react";
import '../css/UserHomePage.css'
import axios from "axios";

class DropDownShelves extends Component {

constructor(props) {
    super(props);
    this.state = {
      books:props.books,
    };
    this.handelBookShelf = this.handelBookShelf.bind(this);
  }


  componentWillReceiveProps(nextProps){
    this.setState({
      books:nextProps.books,
      book:nextProps.book
    })
}

  handelBookShelf = event  => {
    const newBooks = this.state.books.map(book=>{
      if(book.bookInfo.bookName == event.target.name)
      {
        book.shelf = event.target.value;
        const token = localStorage.token;
        if (token) {
          const conf = {
         
            headers: {
              "x-auth": token
            }
          };
          axios
            .put(
              `/api/users/current/books/${event.target.name}?mode=${book.shelf}`,{},
              conf
            )
            .then(res => {
              this.setState({books:newBooks});
            })
            .catch(err => console.log(err));
        }
      }
      return book;
    })
  };



  render() {
    return (
        <div>
          {console.log(this.props.book)}
        {(
        <select
        value={this.props.book.shelf}
        onChange={this.handelBookShelf}
        name={this.props.book.bookInfo.bookName}
        id="userShelf"
        className="form-control form-control-sm">
            <option value="Read" >Read</option>
            <option value="current">Currently Reading</option>
            <option value="toRead">To Read</option>
        </select>
        )}
        </div>
    );
  }
}




export default DropDownShelves;
