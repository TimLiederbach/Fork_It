import React, { Component } from 'react';
import dotenv from 'dotenv';
import './App.css';
import Landing from './components/Landing';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';
import SearchDashboard from './components/SearchDashboard'
import RestaurantDashboard from './components/RestaurantDashboard'
import Restaurant from './components/Restaurant'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      email: '',
      password:'',
      isLoggedIn: null,
    };
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  isLoggedIn()  {
    const res = !!(localStorage.getItem("jwt"));
    this.setState({
      isLoggedIn: res
    })
    return res;
  }

  register (input)  {
    const url = `${BASE_URL}/users`
    const body = {"user": {
      "username": input.username,
      "email": input.email,
      "password": input.password,
      "password_confirmation": input.password
      }
    }
    const init = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      mode: 'cors',
      body:JSON.stringify(body),
    }
    console.log('about to fetch')
    fetch(url, init)
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  login (creds)  {
    const url = `${BASE_URL}/user_token`
    const body = {"auth": {
      "email": creds.email,
      "password": creds.password
      }
    }
    const init = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      mode: 'cors',
      body:JSON.stringify(body),
    }
    console.log(url, init)
    fetch(url, init)
      .then(res => res.json())
      .then(res => localStorage.setItem("jwt", res.jwt))
      .then(() => this.setState({
        email: creds.email,
        password: creds.password,
        isLoggedIn: true
      }))
      .catch(err => console.log(err))
  }

  logout()  {
    localStorage.removeItem("jwt")
    this.setState({
      isLoggedIn: false
    })
  }

  fetchRestaurants(input) {
    const url = `https://developers.zomato.com/api/v2.1/search?entity_id=36932&q=${input.keyword}&count=20`
    const init = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'user-key': '85b5695feaf12f73f74644ebd7852b2c'
      }
    }
    fetch(url, init)
    .then(res => {
      if(!res.ok) throw new Error(res.statusMessage);
      return res.json();
    })
    // debugger 1;
    .then(resBody=> {
      console.log('this be resBody.res', resBody.restaurants)
      this.setState({
        restaurants: resBody.restaurants
      })
    })
    // debugger 2;
    .catch(err=> console.log(err))
  }

  findRestaurant(params_id)  {
    const filterRestaurant = this.state.restaurants.filter(restaurant =>
      restaurant.restaurant.id === params_id)
    return filterRestaurant
  }

  componentDidMount() {
    this.isLoggedIn()
  }



// Handle Callback Functions

  handleLogin(creds) {
    this.login(creds);
  }

  handleRegister(input) {
    this.register(input);
  }

  handleLogout() {
    this.logout();
  }

  handleSearch(input)  {
    this.fetchRestaurants(input);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <h1>Fork It</h1>
          <h5>"Restaurant Recommendations"</h5>

          <Navbar onLogin={ this.handleLogout } />

          <Route
            exact path = "/"
            component = { Landing }
          />

          <Route
            path = "/login"
            render = { () => (<LoginForm onLogin={ this.handleLogin } />)}
          />

          <Route
            path = "/register"
            render = { () => (<RegisterForm onLogin={ this.handleRegister } />)}
          />

          <Route
            path = "/search"
            render = { () => (<SearchDashboard onSubmit={ this.handleSearch } />)}
          />

          <Route
            exact path = "/restaurants"
            render = { () => (
              <RestaurantDashboard
                restaurants={ this.state.restaurants }
              />)}
          />

          <Route
            path="/restaurants/:id"
            component={ (props) => (
              <Restaurant
                {...props}
                restaurant={ this.findRestaurant(props.match.params.id) }
              />
            )} />

        </div>
      </Router>
    );
  }
}

export default App;
