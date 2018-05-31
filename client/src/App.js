import React, { Component } from 'react';
import './App.css';
import Landing from './components/Landing';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL;

class App extends Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      username: '',
      email: '',
      password:'',
      isLoggedIn: null,
    };
  }

  login ()  {
    const url = `${BASE_URL}/api/user_token`
    const body = {"auth": {
      "username": this.state.username,
      "email": this.state.email,
      "password": this.state.password
      }
    }
    const init = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      mode: 'cors',
      body:JSON.stringify(body),
    }
    fetch(url)
  }

  componentDidMount() {
    fetch(`${BASE_URL}/users`)
      .then(resp => resp.json())
      .then(data => this.setState({
        users: data.users
      }))
  }

login ()  {
  const username = $
}

handleLogin(creds) {
  this.loginRequest(creds);
}

handleRegister(creds) {
  this.registerRequest(creds);
}

  render() {
    return (
      <Router>
        <div className="App">
          <h1>Fork It</h1>
          <h5>"Restaurant Recommendations"</h5>

          <Navbar />

          <Route
            exact path = "/"
            component = { Landing }
          />

          <Route
            path = "/login"
            render = { () => (<LoginForm onLogin={this.handleLogin} />)}
          />

          <Route
            path = "/register"
            render = { () => (<RegisterForm onLogin={this.handleRegister} />)}
          />

        </div>
      </Router>
    );
  }
}

export default App;
