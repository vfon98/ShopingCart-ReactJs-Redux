/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";

const Navbar = props => {
  const cart = useSelector(state => state.cartReducer)
  return (
    <nav className='navbar navbar-expand-sm bg-dark navbar-dark fixed-top'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          Shopping Now
        </Link>

        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>
              <i className='fa fa-lg fa-shopping-bag mr-2'></i>Shop
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/cart'>
              <i className='fa fa-lg fa-shopping-cart mr-2'></i>My cart
              <span className='badge badge-pill badge-warning ml-1'>
                {cart.totalItems}
              </span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/login'>
              <i className='fa fa-lg fa-user mr-2'></i>My account
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);