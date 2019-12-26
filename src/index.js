import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import 'bootstrap/dist/js/bootstrap.bundle';
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import store from "./store/configureStore";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { StripeProvider } from "react-stripe-elements";
import { updateCartInLocalStorage } from './actions/cart.actions'
import { authUser } from "./actions/auth.actions";

// eslint-disable-next-line no-unused-vars
const PERSONAL_STRIPE_KEY = 'pk_test_QOOyeVrCYofsYsT36rGSO9Ij00IaJ3SQYt';
const COMPANY_STRIPE_KEY = 'pk_test_7X4at47jVmUqka7N8HhdO35N';
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <StripeProvider apiKey={COMPANY_STRIPE_KEY}>
        <App />
      </StripeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);

store.dispatch(authUser());
store.subscribe(() => {
  const userCart =(store.getState().cartReducer);
  const localCart = localStorage.getItem('user-cart');
  if (JSON.stringify(userCart) !== localCart) {
    updateCartInLocalStorage(userCart);
  }
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
