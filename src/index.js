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

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <StripeProvider apiKey='pk_test_QOOyeVrCYofsYsT36rGSO9Ij00IaJ3SQYt'>
        <App />
      </StripeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
