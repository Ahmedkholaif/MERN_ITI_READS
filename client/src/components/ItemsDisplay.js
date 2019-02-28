import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

class ItemsDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items
    };
  }


componentWillReceiveProps(nextProps){
    this.setState({
       items:nextProps.items,
    })
}

  render() {
    return (
      <Col>
        <Row className="justify-content-md-center">
          <Col>
            <Row>
              {this.state.items.map(item => (
                <Col xs="3">
                  <Row className={"item"}>
                    <Col>
                      <img src={item.img} height="50px" />
                    </Col>
                  </Row>
                  <Row className={"item"}>
                    <Col>
                      <Link to={`/book?${item.bookName}`} replace>
                        {item.bookName}
                      </Link>
                    </Col>
                  </Row>
                  <Row className={"item lastItem"}>
                    <Col>
                      <Link to={`/author?${item.author}`} replace>
                        {item.author}
                      </Link>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default ItemsDisplay;
