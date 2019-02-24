import React, { Component } from 'react';

export default class DropDownList extends Component {

  state = {

    selected: '',

  };


  handleChange = (selected) => {

    this.setState({ selected: selected.target.value });
  };

  render() {
    
    const {options} = this.props;

    return(
    <select
      onChange={this.handleChange}
      value={this.props.shelf}
    >
      <option value="read">Read</option>
     <option value="current">Currently Reading</option>
     <option value="toRead">To Read</option>
    </select>
    );
  }

}

