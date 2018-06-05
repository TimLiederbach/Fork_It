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
import ReviewForm from './components/ReviewForm'
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
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQhBQqgePdfkdm3c97J567SqD0NiNFPeNuheR8ZauUIGFyYnMUHA',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQalNYwrbVq1rOlG-9DEUo5LKAIpqMevRQfJmZD6YvaryJxeaBv',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR15rxi4y5tbelHKzMy0XVWid5jBiB3q3nlT-52b2BLFfuDH3TVpA',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb6SPrZ49xZwSt2vTgApZF-ctPETRXD0vcqhS-Jiic5q6gklwiBw',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc292WjGwFedgxD_R5Oq37ga9IsezMZzDKSQQm9kDW44UO1zL6EA',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqYsyFGl8IRImV0zWzU0EDxetrEQGjsjxHLhsuZgz-_zCVDrL6Sw'],
      isLoggedIn: null,
    };
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.logout=this.logout.bind(this)
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
        "Accept": "json/application",
        "Content-Type": "json/application",
        "Authorization": `Bearer ${jwt}`
        },
      body:JSON.stringify(body)
    }
    const url =`${BASE_URL}/reviews`

    console.log(init)

    fetch(url, init)
    .then(res => res.json())
    .then(resBody => {
        this.setState((prevState, props) => {
          return {
            reviews: prevState.reviews.concat(resBody.data)
          }
        })
      })
    .catch(err => err)
  }

  fetchRestaurants(input) {
    const url = `https://developers.zomato.com/api/v2.1/search?entity_id=36932&q=${input.keyword}&count=6`
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
    .then(resBody=> console.log('resBody', resBody))
    //   this.setState({
    //     restaurants: resBody.restaurants
    //   })
    // })
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

  handleCreate(review)  {
    console.log('app review', review)
    this.createReview(review);
  }

  render() {
    return (
      <Router>
        <div className="App">
        <div className='header'>
          <h1 className='title'>Fork It</h1>
          <h5 className='slogan'>"Restaurant Recommendations"</h5>
          <img className='fork-logo' src='http://clipartstation.com/wp-content/uploads/2017/11/spoon-clipart-black-and-white-2.jpg'/>
        </div>
          {this.state.isLoggedIn? (
          <nav>
            <ul className='nav-bar'>
              <li><Link className='nav-link' to='/search'>Search</Link></li>
              <li><Link className='nav-link' onClick={ this.logout } to='/logout'>Logout</Link></li>
            </ul>
          </nav>
          ):(
          <nav>
            <ul className='nav-bar'>
              <li><Link className='nav-link' to='/login'>Login</Link></li>
              <li><Link className='nav-link' to='/register'>Register</Link></li>
            </ul>
          </nav>
          )}
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
                images={this.state.images}
              />)}
          />

          <Route
            path="/restaurants/:id"
            component={ (props) => (
              <div>
              <Restaurant
                {...props}
                restaurant={ this.findRestaurant(props.match.params.id)}
                images={ this.state.images }
              />
              <ReviewList
                {...props}
                restaurant={ this.findRestaurant(props.match.params.id) }
                reviews={ this.state.reviews }
                email={this.state.email}
                onSubmit={this.handleCreate}
              />
              </div>
            )} />

          <Route
            exact path="/reviews"
            render={() =>
              <ReviewList
                reviews={this.state.reviews}
                email={this.state.email}
                onDelete={this.handleDelete}
                onEdit={this.handleEdit}
              /> }
          />

          <Route
            exact path="/new"
            render={()=>
              <ReviewForm
                onSubmit={this.handleSubmit}
              />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
              // <li><Link className='nav-link' to='/reviews'>Reviews</Link></li>
// <Navbar onLogin={ this.handleLogout } />
