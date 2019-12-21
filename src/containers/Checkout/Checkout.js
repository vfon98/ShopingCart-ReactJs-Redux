import React, { Component } from "react";
import { injectStripe, CardElement } from "react-stripe-elements";
import { connect } from "react-redux";
import { checkOutUser } from "../../actions";
import { withRouter } from "react-router-dom";

class Checkout extends Component {
  state = {
    isPaid: false,
    isLoading: null,
    errorMessage: ""
  };

  submitCard = async () => {
    const userInfo = this.props;
    this.setState({ isLoading: true });
    this.props.stripe.createToken({ name: userInfo.username }).then(payload => {
      console.log("TOKEN", payload);
      if (payload.error) {
        this.setState({
          errorMessage: payload.error.message,
          isLoading: null
        });
      } else {
        this.props.checkOutUser(userInfo.userID);
        this.setState({
          isPaid: true,
          isLoading: false
        });
        // this.props.history.push("/");
      }
    });
  };

  render() {
    console.log(this.state.isLoading);
    const { userInfo, cart } = this.props;
    const { isLoading } = this.state;
    // totalPrice === 0 that means PAID
    const isPaid = this.state.isPaid || this.props.cart.totalPrice === 0;
    return (
      <div className='row'>
        <div className='offset-3 col-md-6'>
          <div className='card shadow' id='checkout'>
            <div className='card-header bg-success text-white'>
              <h4 className='text-center font-weight-bold'>
                Order Information
              </h4>
            </div>
            <div className='card-body'>
              <div className='form-group'>
                <label>Username</label>
                <input
                  readOnly
                  type='text'
                  className='form-control'
                  value={userInfo.username}
                />
              </div>
              <div className='form-group'>
                <label>Address</label>
                <input
                  readOnly
                  type='text'
                  className='form-control'
                  value={userInfo.address}
                />
              </div>
              <div className='form-group row'>
                <label className='col-md-3 col-form-label'>Total price:</label>
                <input
                  readOnly
                  type='text'
                  className='col-md-9 form-control-plaintext font-weight-bold'
                  value={"$" + cart.totalPrice.toLocaleString("en-EN")}
                />
              </div>
              <hr />
              <label>Card information</label>
              <CardElement
                hidePostalCode={true}
                className='border p-2 rounded'
                style={{ base: { fontSize: "18px" } }}
              />
              <div className='text-danger font-italic font-smaller'>
                {this.state.errorMessage}
              </div>

              <button
                type='button'
                className='btn btn-primary btn-lg btn-block mt-3'
                onClick={this.submitCard}
                disabled={isPaid}
              >
                <i
                  // Just animation... Forget it
                  className={
                    "fa fa-lg mr-2 " +
                    (isLoading !== null
                      ? isLoading === true
                        ? "fa-spinner fa-spin"
                        : "fa-check"
                      : "fa-shopping-cart")
                  }
                ></i>
                {isPaid ? "Paid" : "Checkout"}
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
    cart: state.cartReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkOutUser: userID => dispatch(checkOutUser(userID))
  };
};

export default injectStripe(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout))
);
