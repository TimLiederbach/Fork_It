import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  this.handleInputChange = this.handleInputChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onLogin(this.state);
    this.setState({
      email: '',
      password: '',
      isUserLoggedIn: true
    });
  }

  render() {
    return (
      <div>

        {this.state.isUserLoggedIn && <Redirect to ='/search' />}

        <form onSubmit={this.handleSubmit}>

          <label>
            Email:
            <input
              type='text'
              onChange={this.handleInputChange}
              value={this.state.email}
              name='email'
            />
          </label>

          <label>
            Password:
            <input
              type='password'
              onChange={this.handleInputChange}
              value={this.state.password}
              name='password'
            />
          </label>

          <button
            type='submit'
            className='login-button'
          >Login
          </button>

        </form>
      </div>
    )
  }
}

export default LoginForm;
