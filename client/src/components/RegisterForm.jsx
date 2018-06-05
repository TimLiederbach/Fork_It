import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
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
      username: '',
      email: '',
      password: '',
      isUserLoggedIn: true
    });
  }

  render() {
    return (
      <div className='login-wrapper'>

        {this.state.isUserLoggedIn && <Redirect to ='/login' />}
        <div className='login-div'>
          <h3>Register Form</h3>
          <form onSubmit={this.handleSubmit}>

            <label>
              User Name:
              <input
                type='text'
                onChange={this.handleInputChange}
                value={this.state.username}
                name='username'
              />
            </label>

            <label>
              Email:
              <input
                type='email'
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
            >Register
            </button>

          </form>
        </div>
      </div>
    )
  }
}

export default RegisterForm;
