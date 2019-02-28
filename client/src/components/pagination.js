import React, { Component } from "react";
import Pagination from "react-js-pagination";

import '../css/UserHomePage.css'


class CustomPagination extends Component {

constructor(props) {
    super(props);
    

}


/*

this component accept the next props:
1- the active page ( it should be in the state of the parent )
2- on change function ( do it whatever you want to get or display - we gonna send request to import PropTypes from 'prop-types'
get 5 books per page )
*/

render() {
return (
    <div className="pagginationContainer">
    <Pagination
    // hideDisabled
    // hideFirstLastPages
    prevPageText={<i className='fas fa-angle-left'/>}
    nextPageText={<i className='fas fa-angle-right'/>}
    activePage={this.props.activePage}
    itemsCountPerPage={5}
    totalItemsCount={this.props.max}
    pageRangeDisplayed={this.props.chunk}
    onChange={this.props.change}
    itemClass={"page-item"}
    linkClass={"page-link"}
    />
    </div>
);
}
}




export default CustomPagination;
