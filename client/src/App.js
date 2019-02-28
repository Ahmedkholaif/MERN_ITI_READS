import React, {Component} from "react";
import {BrowserRouter,Route} from "react-router-dom";
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import GuestHomePage from './components/GuestHomePage'
import HomePage from './components/userHomePage'
import Categories from './components/userCategoriesPage'
import Category from './components/categoryBooksPage'
import books from './components/AllBooksPage'
import authors from './components/AllAuthorsPage'
import singleBook from './components/SingleBookPage'
import singleAuthor from './components/SingleAuthorPage'
import './App.css'

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className='App'>
                    <Route path="/admin" exact component={AdminLogin}/>
                    <Route path="/admin/dashboard" exact component={AdminDashboard}/>
                    <Route path='/' exact component={GuestHomePage}/>
                    <Route path='/Home' exact component={HomePage}/>
                    <Route path='/Categories' exact component={Categories}/>
                    <Route path='/Category' exact component={Category}/>
                    <Route path='/books' exact component={books}/>
                    <Route path='/authors' exact component={authors}/>
                    <Route path='/book' exact component={singleBook}/>
                    <Route path='/author' exact component={singleAuthor}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
