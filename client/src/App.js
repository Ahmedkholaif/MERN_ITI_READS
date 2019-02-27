import React, {Component} from "react";
import {BrowserRouter,Route} from "react-router-dom";
import AdminLogin from './components/AdminLogin'
import GuestHomePage from './components/GuestHomePage'
import HomePage from './components/userHomePage'
import Categories from './components/userCategoriesPage'
import Category from './components/categoryBooksPage'
import books from './components/AllBooksPage'
import authors from './components/AllAuthorsPage'
import testBook from './components/SingleAuthorPage'
import './App.css'

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className='App'>
                    <Route path="/admin" exact component={AdminLogin}/>
                    <Route path='/' exact component={GuestHomePage}/>
                    <Route path='/Home' exact component={HomePage}/>
                    <Route path='/Categories' exact component={Categories}/>
                    <Route path='/Category' exact component={Category}/>
                    <Route path='/books' exact component={books}/>
                    <Route path='/testBook' exact component={testBook}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
