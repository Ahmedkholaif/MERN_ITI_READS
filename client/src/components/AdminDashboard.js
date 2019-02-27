import React from 'react';
import {TabContent, TabPane, Button, Nav, Table, NavItem, NavLink, Row, Col} from 'reactstrap';
import classnames from 'classnames';
import CategoriesView from '../components/CategoriesView'
import AuthorView from '../components/AuthorView'

import '../css/AdminLogin.css';


export default class Example extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    handleSignout(){
        // handle using redirect
        // handle with login
        // handle using localStorage
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <div className='AdminDashboard'>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === '1'})}
                            onClick={() => {
                                this.toggle('1');
                            }}
                        >
                            Categories
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === '2'})}
                            onClick={() => {
                                this.toggle('2');
                            }}
                        >
                            Books
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === '3'})}
                            onClick={() => {
                                this.toggle('3');
                            }}
                        >
                            Authors
                        </NavLink>
                    </NavItem>
                    <Button color='danger'>SignOut</Button>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <CategoriesView/>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Col sm="12">
                            <div>
                                <h1>Books Contents</h1>
                                <Button color='primary' size='lg' block type="submit">Add Book </Button>
                            </div>
                            <Table>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </TabPane>
                    <TabPane tabId="3">
                        <Col sm="12">
                            <AuthorView/>
                        </Col>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

// Admin Dashboard:
// Book Components: ViewBooks - BookControls
// Author Components: ViewAuthor - AuthorControls
// Categories Components: ViewCategory - CategoryControl
// stylesheet
// Tabs & Tables
