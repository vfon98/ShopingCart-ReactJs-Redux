import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./cart.style.scss";
import CartItem from "../../components/CartItem";

class Cart extends Component {
  render() {
    return (
      <React.Fragment>
        <table id='cart' className='table table-hover table-striped'>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <CartItem />
            <CartItem />
            <CartItem />
          </tbody>
          <tfoot>
            <tr>
              <td>
                <Link to='/' className='btn btn-warning'>
                  <i className='fa fa-angle-double-left'></i> Continue Shopping
                </Link>
              </td>
              <td colSpan='2' className='text-center'>
                <strong>Total $1.99</strong>
              </td>
              <td colSpan='2'>
                <Link
                  to='/checkout'
                  className='btn btn-success btn-block text-white'
                >
                 <i className='fa fa-cart-arrow-down fa-lg mr-2'></i>Checkout
                </Link>
              </td>
            </tr>
          </tfoot>
        </table>
      </React.Fragment>
    );
  }
}

export default Cart;
