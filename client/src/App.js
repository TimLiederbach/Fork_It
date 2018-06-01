import React, { Component } from 'react';
import './App.css';
import Landing from './components/Landing';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.API_KEY

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

, {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
      Authorization: bearer,
      'content-type': 'application/json'
    }
  })


  fetchRestaurants(keyword) {
    console.log(keyword)
    const url = `https://developers.zomato.com/api/v2.1/search?entity_id=36932&q=${keyword}&count=20`
    const init = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'user-key': API_KEY
      }
    }

    fetch(url, init)
    .then(res => {
      if(!resp.ok) throw new Error(resp.statusMessage);
      return resp.json();
    })
    .then(resBody=> console.log(resBody.restaurants)
    )
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

  handleSearch(keyword)  {
    this.fetchRestaurants(keyword);
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

        </div>
      </Router>
    );
  }
}

export default App;
