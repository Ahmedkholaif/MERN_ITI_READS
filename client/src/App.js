import React, {Component} from "react";
import {BrowserRouter,Route} from "react-router-dom";
import AdminLogin from './components/AdminLogin'
import GuestHomePage from './components/GuestHomePage'
import HomePage from './components/userHomePage'
import Categories from './components/userCategoriesPage'
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
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
