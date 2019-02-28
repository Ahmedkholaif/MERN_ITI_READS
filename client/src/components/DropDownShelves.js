import React, { Component } from "react";
import '../css/UserHomePage.css'

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
      books:nextProps.books
    })
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
