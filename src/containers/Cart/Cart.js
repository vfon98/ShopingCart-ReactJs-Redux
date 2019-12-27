/* eslint-disable no-restricted-globals */
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./cart.style.scss";
import CartItem from "../../components/CartItem";
import { clearCart } from "../../actions/cart.actions";

class Cart extends Component {
  render() {
    const { cart, auth } = this.props;

    const handleClearCart = () => {
      if (confirm("Are you sure ?")) {
        this.props.clearCart(auth.token);
      }
    };

    if (!auth.isLogin) {
      return <Redirect to="/login" />;
    }
    const cartItems = cart.cart_detail.map(item => {
      return <CartItem {...item} key={item.product.id} />;
    });
    return (
      <React.Fragment>
        <div className="table-responsive">
          <table id="cart" className="table table-hover table-striped">
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
              {/* Check if cart is empty */}
              {cartItems.length ? (
                cartItems
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-info h3">
                    Cart is empty !
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <Link to="/" className="btn btn-warning">
                    <i className="fa fa-angle-double-left fa-lg mr-1"></i>
                    Continue Shopping
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger m-1"
                    onClick={handleClearCart}
                  >
                    <i className="fa fa-times fa-lg mr-1"></i>Clear cart
                  </button>
                </td>
                <td colSpan="2" className="text-center">
                  <strong>Total ${cart.total.toLocaleString("en-EN")}</strong>
                </td>
                <td colSpan="2">
                  <Link
                    to="/checkout"
                    className="btn btn-success btn-block text-white"
                  >
                    <i className="fa fa-cart-arrow-down fa-lg mr-2"></i>Checkout
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

const mapStateToProps = state => ({
  cart: state.cartReducer,
  auth: state.authReducer
});

const mapDispatchToProps = dispatch => ({
  clearCart: token => dispatch(clearCart(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
