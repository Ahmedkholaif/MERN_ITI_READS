import React from 'react';
import { TabContent, TabPane, Button, Nav, NavItem, NavLink, Col } from 'reactstrap';
import classnames from 'classnames';
import CategoriesView from '../components/CategoriesView'
import AuthorView from '../components/AuthorView'
import BookView from '../components/BookView'
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import '../css/AdminLogin.css';


export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handlePassAuthorsProps = this.handlePassAuthorsProps.bind(this);
        this.handlePassCategoriesProps = this.handlePassCategoriesProps.bind(this);
        this.state = {
            activeTab: '1',
            categories: [],
            authors: []
        };
    }

    handleSignout(event) {
        event.preventDefault();
        if (localStorage.token) {
            const conf = {
                headers: { 'x-auth': localStorage.token }
            };
            axios.delete('/api/signout', conf)
                .then(response => {
                    localStorage.clear();
                    window.location.href = '/';
                }).catch(error => {
                    console.log(error);
                });
        }
    }

    handlePassCategoriesProps(categoriesProps) {
        this.setState({
            categories: categoriesProps
        });
    }

    handlePassAuthorsProps(authorsProps) {
        this.setState({
            authors: authorsProps
        });
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
            localStorage.token ?
                <div className='AdminDashboard'>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => {
                                    this.toggle('1');
                                }}
                            >
                                Categories
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => {
                                    this.toggle('2');
                                }}
                            >
                                Books
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => {
                                    this.toggle('3');
                                }}
                            >
                                Authors
                            </NavLink>
                        </NavItem>
                        <Button color='danger' onClick={this.handleSignout}>SignOut</Button>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Col sm="12">
                                <CategoriesView passCategories={this.handlePassCategoriesProps} />
                            </Col>
                        </TabPane>
                        <TabPane tabId="2">
                            <Col sm="12">
                                <BookView categories={this.state.categories} authors={this.state.authors} />
                            </Col>
                        </TabPane>
                        <TabPane tabId="3">
                            <Col sm="12">
                                <AuthorView passAuthors={this.handlePassAuthorsProps} />
                            </Col>
                        </TabPane>
                    </TabContent>
                </div>
                : <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />
        );
    }
}

// stylesheet
