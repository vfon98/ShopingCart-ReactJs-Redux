/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/auth.actions";

const Navbar = props => {
  const cart = useSelector(state => state.cartReducer);
  const userInfo = useSelector(state => state.userReducer);
  const auth = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    if (confirm("Are you sure to logout ?")) {
      dispatch(logout(auth.token));
      history.push("/login");
    }
  };
  return (
    <nav className='navbar navbar-expand-sm bg-dark navbar-dark fixed-top p-2 p-sm-0'>
      <div className='container-fluid container-lg'>
        <Link className='navbar-brand' to='/'>
          Shopping Now
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#collapsibleNavbar'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <ul
          className='navbar-nav collapse navbar-collapse d-sm-flex justify-content-sm-end'
          id='collapsibleNavbar'
        >
          <li className='nav-item'>
            <NavLink
              className='nav-link'
              activeClassName='active'
              to='/products'
            >
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
                {cart.cart_detail.length || ''}
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
          {auth.isLogin && (
            <li className='nav-item' title={userInfo.id}>
              <a className='nav-link' onClick={handleLogout}>
                <i className='fa fa-lg fa-power-off mr-2'></i>
                {userInfo.firstName}
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
