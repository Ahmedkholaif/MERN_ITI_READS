import React, { Component } from "react";
import StarRatingComponent from 'react-star-rating-component';


/*

this component accept the next props:
1- the rate of the book to display import PropTypes from 'prop-types'
2- the name of the book to use it editing the book
3- the whole books displayed in the page to change them on click
4- boolean variable to set if it's editable or not
*/

class RatingStars extends Component {
    constructor(props) {
        super(props);
     
        this.state = {
          rating: this.props.rate,
          books:props.books,
        };
        this.onStarClick = this.onStarClick.bind(this);
      }
     
      onStarClick(nextValue, prevValue, name) {
        const newBooks = this.state.books.map(book=>{
            if(book.bookInfo.bookName == name)
            {
              book.rate = nextValue;
            }
            return book;
          })
          this.setState({books:newBooks});
        this.setState({rating: nextValue});
      }
     

  componentWillReceiveProps(nextProps){
    this.setState({
      books:nextProps.books,
      rating: nextProps.rate,
    })
}

      render() {
        const { rating } = this.state;
        
        return (                
          <div>
            <StarRatingComponent 
              name={this.props.name} 
              starCount={5}
              value={rating}
              onStarClick={this.props.clickable ? this.onStarClick.bind(this) : ""}
             starColor={"#DA5637"}
            />
          </div>
        );
      }
}

export default RatingStars;
