import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./cart.style.scss";
import CartItem from "../../components/CartItem";
import { updateCartInLocalStorage } from '../../actions';

class Cart extends Component {
  // Update localStorage after cart changed
  componentDidUpdate = () => {
    const { cart } = this.props.cart;
    const localCart = localStorage.getItem("user-cart");
    if (JSON.stringify(cart) !== localCart && cart.length !== 0) {
      updateCartInLocalStorage(cart);
      console.log("Updated local storage");
    }
  };

  render() {
    const { cart, totalPrice } = this.props.cart;
    const { isLogin } = this.props.userInfo;
    const cartItems = cart.map(item => {
      return <CartItem {...item} key={item.id} />;
    });
    if (!isLogin) {
      return <Redirect to='/login' />;
    }
    return (
      <React.Fragment>
        <div className='table-responsive'>
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
                    <i className='fa fa-angle-double-left'></i> Continue
                    Shopping
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
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cartReducer,
    userInfo: state.userReducer
  };
};

export default connect(mapStateToProps)(Cart);
