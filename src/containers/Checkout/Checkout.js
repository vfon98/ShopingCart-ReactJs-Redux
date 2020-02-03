import React, { Component } from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { checkoutCart } from '../../actions/cart.actions';

class Checkout extends Component {
  state = {
    isLoading: null,
    errorMessage: ''
  };

  submitCard = e => {
    const { userInfo, auth } = this.props;
    this.setState({ isLoading: true });
    this.props.stripe.createToken({ email: userInfo.email }).then(res => {
      console.log('STRIPE TOKEN', res);
      if (res.error) {
        this.setState({
          errorMessage: res.error.message,
          isLoading: null
        });
      } else {
        // Stripe token received
        this.props.checkoutCart(auth.token, res.token.id).then(() => {
          console.log('CHECKED OUT');
          this.setState({
            isLoading: false
          });
        });
        // this.props.history.push("/");
      }
    });
  };

  render() {
    const { userInfo, cart } = this.props;
    const { isLoading } = this.state;
    // totalPrice === 0 that means PAID
    const isPaid = cart.paid_at; // || this.props.cart.total === 0;
    return (
      <div className="row">
        <div className="offset-3 col-md-6">
          <div className="card shadow" id="checkout">
            <div className="card-header bg-success text-white">
              <h4 className="text-center font-weight-bold">
                Order Information
              </h4>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Customer</label>
                <input
                  readOnly
                  type="text"
                  className="form-control"
                  value={
                    userInfo.firstName
                      ? userInfo.firstName + ' ' + userInfo.lastName
                      : 'Loading...'
                  }
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  readOnly
                  type="email"
                  className="form-control"
                  value={userInfo.email || 'Loading...'}
                />
              </div>
              <div className="form-group row">
                <label className="col-md-3 col-form-label">Total price:</label>
                <input
                  readOnly
                  type="text"
                  className="col-md-9 form-control-plaintext font-weight-bold"
                  value={'$' + cart.total.toLocaleString('en-EN')}
                />
              </div>
              <hr />
              <label>Card information (4242424242424242)</label>
              <CardElement
                hidePostalCode={true}
                className="border p-2 rounded"
                style={{ base: { fontSize: '18px' } }}
              />
              <div className="text-danger font-italic font-smaller">
                {this.state.errorMessage}
              </div>

              <button
                type="button"
                className="btn btn-primary btn-lg btn-block mt-3"
                onClick={this.submitCard}
                disabled={isLoading || isPaid}
              >
                <i
                  // Just animation... Forget it
                  className={
                    'fa fa-lg mr-2 ' +
                    (isLoading !== null
                      ? isLoading === true
                        ? 'fa-spinner fa-spin'
                        : 'fa-check'
                      : 'fa-shopping-cart')
                  }
                ></i>
                {isPaid ? 'Paid successfully !' : 'Checkout'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userReducer,
    cart: state.cartReducer,
    auth: state.authReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkoutCart: (token, stripe_token) =>
      dispatch(checkoutCart(token, stripe_token))
  };
};

export default injectStripe(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout))
);
