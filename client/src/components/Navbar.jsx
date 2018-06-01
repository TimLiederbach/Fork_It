import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  constructor(props)  {
    super(props);
  }

  render() {
    const isCurrentUser = this.props.currentUser;
    const display = isCurrentUser ? (
          <div className='nav'>
            <div
              name='Logout'
            >
              <Link
                onSubmit={ this.handleLogout }
                to="/">
                Logout
              </Link>
            </div>
          </div>
        ) :
        (
          <div>
            <div
              name='login'
            >
              <Link to="/login">
                Login
              </Link>
            </div>

            <div
              name='register'
            >
              <Link to = '/register'>
               Register
              </Link>
            </div>
        </div>

        )
    return (
      <div>
        { display }
      </div>
    )

  }
}

export default Navbar;
