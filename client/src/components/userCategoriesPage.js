import React, { Component } from "react";
import { Row, Col } from 'reactstrap';
import '../css/UserCategoriesPage.css'
import CustomNavbar from './Navbar';


class UserHomePage extends Component {

constructor(props) {
    super(props);
    this.state={
        categories : [{catName:"cat 1",catLink:"/home"},
                    {catName:"cat 33",catLink:"/home"},
                    {catName:"cat 3",catLink:"/home"},
                    {catName:"cat 58",catLink:"/home"},
                    {catName:"cat 1",catLink:"/home"},
                    {catName:"cat 2",catLink:"/home"},
                    {catName:"cat 3",catLink:"/home"},
                    {catName:"cat 44",catLink:"/home"},
                    {catName:"cat 1",catLink:"/home"},
                    {catName:"cat 7",catLink:"/home"},
                    {catName:"cat 3",catLink:"/home"},
                    {catName:"cat 0",catLink:"/home"}],
     categoryUnit:[],
    }
    const chunk_size = 4;
    const arr = this.state.categories;
    this.state.categoryUnit = arr.map( function(e,i){ 
         return i%chunk_size===0 ? arr.slice(i,i+chunk_size) : null; 
    }).filter(function(e){ return e; });

  }


  
render() {
return (
    
    <div>
        <CustomNavbar/>
        <Row className="bookShelves">
        {(
           this.state.categoryUnit.map(cats =>(
               <Col>
                    <div>
                        <ul className="bookCatShelves">
                            <li>
                                <a href={cats[0].catLink}>{cats[0].catName}</a>
                            </li>
                            <li className="catShelf">

                            </li>
                        </ul>
                        {(cats.length >0 ? (
                        <ul className="bookCatShelves">
                            <li>
                            <a href={cats[0].catLink}>{cats[1].catName}</a>
                            </li>
                            <li className="catShelf">
                                
                            </li>
                        </ul>
                        ):"")}

                        {(cats.length >1 ? (
                        <ul className="bookCatShelves">
                            <li>
                            <a href={cats[0].catLink}>{cats[2].catName}</a>
                            </li>
                            <li className="catShelf">
                                
                            </li>
                        </ul>
                        ):"")}

                        {(cats.length > 2 ? 
                        <ul className="bookCatShelves">
                            <li>
                            <a href={cats[0].catLink}>{cats[3].catName}</a>
                            </li>
                            <li className="catShelf">
                                
                            </li>
                        </ul>
                        :"")}
                        
                    </div>
               </Col>
           ))
        )}
          
        </Row>
      </div>
    );
  }
}




export default UserHomePage;
