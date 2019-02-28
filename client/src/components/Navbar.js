import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";

import "../css/UserHomePage.css";

class CustomNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navbar expand="md">
        <NavbarBrand>
          <ul className="menuItems">
            <li className="menuItem">
              <Link to="/home" replace>
                Home
              </Link>
            </li>
            <li className="menuItem">
              <Link to="/categories" replace>
                Categories
              </Link>
            </li>
            <li className="menuItem">
              <Link to="/books" replace>
                Books
              </Link>
            </li>
            <li className="menuItem">
              <Link to="/authors" replace>
                Authors
              </Link>
            </li>
          </ul>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="leftMenuItem">
              <div class="container h-100">
                <div class="d-flex justify-content-center h-100">
                  <div class="searchbar">
                    <form action="/api/users/current/search" method="post">
                      <input
                        class="search_input"
                        type="text"
                        name=""
                        placeholder="Search..."
                      />
                      <button type="submit" class="search_icon">
                        <i class="fas fa-search" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </NavItem>
            <UncontrolledDropdown nav inNavbar className="leftMenuItem">
              <DropdownToggle nav caret>
                User
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Edit Profile</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Account setting</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem className="leftMenuItem">
              <Button id="signOut" type="submit">
                <Link to="/" replace>
                  Sign out
                </Link>
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default CustomNavbar;
