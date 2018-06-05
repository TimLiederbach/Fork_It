import React, { Component } from 'react';
import { Link } from 'react-router-dom';


function Navbar (props) {
    const isCurrentUser = props.isLoggedIn;
    const display = isCurrentUser ? (
          <div className='nav-right-side'>

            <div className='nav-element'
            >
              <Link
                to="/"
                className='nav-link'>
                Search
              </Link>
            </div>

            <div className='nav-element'
            >
              <Link
                to="/reviews"
                className='nav-link'>
                Reviews
              </Link>
            </div>

            <div className='nav-element'
              name='Logout'
            >
              <Link
                onSubmit={ this.handleLogout }
                to="/"
                className='nav-link'>
                Logout
              </Link>
            </div>

          </div>
        ) :
        (
          <div className='nav-right-side'>
            <div
              name='login'
              className='nav-element'
            >
              <Link to="/login" className='nav-link'>
                Login
              </Link>
            </div>

            <div
              name='register'
              className='nav-element'
            >
              <Link to = '/register' className='nav-link'>
               Register
              </Link>
            </div>
        </div>

        )
    return (

      <nav>

        { display }

      </nav>
    )
}

export default Navbar;
