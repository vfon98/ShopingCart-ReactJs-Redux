import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./cart.style.scss";
import CartItem from "../../components/CartItem";

class Cart extends Component {
  render() {
    const { cart, totalPrice } = this.props.cart;
    const cartItems = cart.map(item => {
      return <CartItem {...item} key={item.id} />;
    });
    
    if (!this.props.userInfo.isLogin) {
      return <Redirect to='/login' />;
    }
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
          <tbody>{cartItems}</tbody>
          <tfoot>
            <tr>
              <td>
                <Link to='/' className='btn btn-warning'>
                  <i className='fa fa-angle-double-left'></i> Continue Shopping
                </Link>
              </td>
              <td colSpan='2' className='text-center'>
                <strong>Total ${totalPrice.toLocaleString("en-EN")}</strong>
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

const mapStateToProps = state => {
  console.log("From mapState:", state.cartReducer);
  return {
    cart: state.cartReducer,
    userInfo: state.userReducer
  };
};

export default connect(mapStateToProps)(Cart);
