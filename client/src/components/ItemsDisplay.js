import React, { Component } from "react";
import { Row, Col } from 'reactstrap';
import {Link} from "react-router-dom";

class ItemsDisplay extends Component {

constructor(props) {
super(props);
this.state={
    items:this.props.items,
    }
}

componentWillReceiveProps(nextProps){
    this.setState({
       items:nextProps.items,
    })
}
  
render() {
return (
    
    <Col xs="12" className="mt-5">
        <Row className="justify-content-md-center">
            <Col>
                <Row>
                    {
                    this.state.items.map(item =>(
                        <Col xs="3">
                        <Row className={"item"}>
                            <Col><img src={item.img} height="100"/></Col>
                        </Row>
                        <Row className={"item"}>
                            <Col><Link to="#" replace>{item.bookName}</Link></Col>
                        </Row>
                        <Row className={"item lastItem"}>
                            <Col><Link to="#" replace>{item.author}</Link></Col>
                        </Row>
                    </Col>
                    ))
                    }
                </Row>
            </Col>
        </Row>
      </Col>
    );
  }
}




export default ItemsDisplay;
