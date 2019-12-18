/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions";

const Navbar = props => {
  const cart = useSelector(state => state.cartReducer);
  const userInfo = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const handleLogout = () => {
    if (confirm("Are you sure to logout")) {
      dispatch(logout());
    }
  };
  return (
    <nav className='navbar navbar-expand-sm bg-dark navbar-dark fixed-top'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          Shopping Now
        </Link>

        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink className='nav-link' exact activeClassName='active' to='/'>
              <i className='fa fa-lg fa-shopping-bag mr-2'></i>Shop
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              className='nav-link'
              exact
              activeClassName='active'
              to='/cart'
            >
              <i className='fa fa-lg fa-shopping-cart mr-2'></i>My cart
              <span className='badge badge-pill badge-warning ml-1'>
                {cart.totalItems}
              </span>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              className='nav-link'
              exact
              activeClassName='active'
              to='/user'
            >
              <i className='fa fa-lg fa-user mr-2'></i>My account
            </NavLink>
          </li>
          {/* Logout button */}
          {userInfo.isLogin && (
            <li className='nav-item'>
              <a className='nav-link' onClick={handleLogout}>
                <i className='fa fa-lg fa-power-off mr-2'></i>
                {userInfo.username}
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
