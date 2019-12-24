import React from "react";
import { NavLink } from 'react-router-dom'

const Pagination = () => {
  return (
    <div>
      <ul className='pagination justify-content-center'>
        <li className='page-item disabled'>
          <NavLink className='page-link' activeClassName='active' to='#'>
            <i className="fa fa-chevron-left"></i>
          </NavLink>
        </li>
        <li className='page-item active'>
          <NavLink className='page-link' activeClassName='active' to='#'>
            1
          </NavLink>
        </li>
        <li className='page-item'>
          <NavLink className='page-link' activeClassName='active' to='#'>
            2
          </NavLink>
        </li>
        <li className='page-item'>
          <NavLink className='page-link' activeClassName='active' to='#'>
            3
          </NavLink>
        </li>
        <li className='page-item'>
          <NavLink className='page-link' activeClassName='active' to='#'>
            <i className="fa fa-chevron-right"></i>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
