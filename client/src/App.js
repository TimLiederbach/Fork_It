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
import ReviewList from './components/ReviewList'
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

  getReviews() {
    const jwt = localStorage.getItem("jwt")
    const init = {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${jwt}`}
    }
    fetch(`${BASE_URL}/reviews`, init)
    .then(res => res.json())
    .then(data => this.setState({
      reviews: data,
    }))
    .catch(err => err)
  }

  createReview(review) {
    const jwt = localStorage.getItem("jwt")
    const body = {"review": {
      "creator_email": review.creator_email,
      "res_id": review.res_id,
      "restaurant_name": review.restaurant_name,
      "overall_rating": review.overall_rating,
      "price_rating": review.price_rating,
      "food_quality": review.food_quality,
      "comments": review.comments
      }
    }
    const init = {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Accept": "json/application",
        "Content-Type": "json/application"},
      mode: 'cors',
      body:JSON.stringify(body)
    }
    fetch(`${BASE_URL}/reviews`, init)
    .then(res => res.json())
    .then(data => this.setState({
      reviews: data
    }))
    .catch(err => err)
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
    this.getReviews()
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
              <div>
              <Restaurant
                {...props}
                restaurant={ this.findRestaurant(props.match.params.id) }
              />
              <ReviewList
                {...props}
                restaurant={ this.findRestaurant(props.match.params.id) }
                reviews={ this.state.reviews }
              />
              </div>
            )} />

        </div>
      </Router>
    );
  }
}

export default App;
